<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LookupController;
use App\Http\Controllers\HouseholdController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('lookup', [LookupController::class, 'show']);
Route::get('lookup-list', [LookupController::class, 'showLookupList']);
Route::get('household', [HouseholdController::class, 'show']);
Route::get('household-list', [HouseholdController::class, 'findHousehold']);
Route::get('household-member', [HouseholdController::class, 'findHouseholdMember']);

Route::post('addHousehold', [HouseholdController::class, 'addHousehold']);
Route::post('addMember', [HouseholdController::class, 'addMember']);
Route::post('updateMember', [HouseholdController::class, 'updateMember']);
Route::post('updateDeceasedMember', [HouseholdController::class, 'updateDeceasedMember']);

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});
