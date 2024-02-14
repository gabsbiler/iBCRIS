<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{

    /**
     * Show all users
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $users = User::all(); // Fetch all users from the database

        return response()->json([
            'users' => $users
        ]);
    }

    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'username' => 'required|string',
            'barangay' => 'required|string',
            'role' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|string',
            'c_password' => 'required|same:password'
        ]);

        $user = new User([
            'name'  => $request->first_name . ' ' . $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'barangay' => $request->barangay,
            'role' => $request->role,
            'password' => bcrypt($request->password),
        ]);

        if ($user->save()) {
            return response()->json([
                'message' => 'Successfully created user!',
            ], 201);
        } else {
            return response()->json(['error' => 'Provide proper details']);
        }
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     */

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->plainTextToken;

        $userAbilities = [
            'accessDashboard' => $user->can('access-dashboard'),
            'accessUsers' => $user->can('access-users'),
            'accessRecords' => $user->can('access-records'),
            'accessReports' => $user->can('access-reports'),
            'accessLookups' => $user->can('access-lookups'),
            'accessMassUploads' => $user->can('access-mass-uploads'),
            'accessRecordBatch' => $user->can('access-record-batch'),
        ];

        return response()->json([
            'accessToken' => $token,
            'token_type' => 'Bearer',
            'userData' => $user,
            'userAbilities' => $userAbilities,
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
