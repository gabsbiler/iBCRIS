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
            'barangay' => 'string|nullable',
            'role' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
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
        // Validate the request
        $request->validate([
            'login' => 'required|string', // 'login' can be either username or email
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        // Determine if the login request is using 'email' or 'username'
        $loginType = filter_var($request->input('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        // Set the credentials for authentication attempt
        $credentials = [$loginType => $request->input('login'), 'password' => $request->input('password')];

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = $request->user();

        if ($user['activation'] == false) {
            return response()->json([
                'message' => 'Account not activated'
            ], 401);
        }
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

    /**
     * Delete a user
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteUser(Request $request, $id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Optional: Prevent users from deleting their own account through this method
        if ($user->id === Auth::id()) {
            return response()->json(['message' => 'You cannot delete your own account'], 403);
        }

        try {
            $user->delete();
            return response()->json(['message' => 'User successfully deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User deletion failed', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    /**
     * Update the specified user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUser(Request $request, $id)
    {
        // Validate the incoming request
        $request->validate([
            'activation' => 'sometimes|boolean',
            'name' => 'sometimes|string',
            'username' => 'sometimes|string|unique:users,username,' . $id,
            'barangay' => 'nullable|string',
            'role' => 'sometimes|string',
            'email' => 'sometimes|string|email|unique:users,email,' . $id,
            // Do not require the password in updates, but validate if provided
            'password' => 'nullable|string|min:6',
        ]);

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update user information
        $user->name = $request->input('name', $user->name);
        $user->username = $request->input('username', $user->username);
        $user->barangay = $request->input('barangay', $user->barangay);
        $user->role = $request->input('role', $user->role);
        $user->email = $request->input('email', $user->email);
        $user->activation = $request->input('activation', $user->activation);
        if ($request->filled('password')) {
            $user->password = bcrypt($request->input('password'));
        }

        try {
            $user->save();
            return response()->json(['message' => 'User successfully updated'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User update failed', 'error' => $e->getMessage()], 500);
        }
    }
}
