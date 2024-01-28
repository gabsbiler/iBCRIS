<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HouseholdContainerController;
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

Route::get('container', [HouseholdContainerController::class, 'show']);
Route::get('lookup', [LookupController::class, 'show']);
Route::get('lookup-list', [LookupController::class, 'showLookupList']);
Route::get('household', [HouseholdController::class, 'show']);
Route::get('household-list', [HouseholdController::class, 'findHousehold']);
Route::get('household-member', [HouseholdController::class, 'findHouseholdMember']);

Route::post('addHousehold', [HouseholdController::class, 'addHousehold']);
Route::post('addMember', [HouseholdController::class, 'addMember']);
Route::post('updateMember', [HouseholdController::class, 'updateMember']);
Route::post('updateDeceasedMember', [HouseholdController::class, 'updateDeceasedMember']);
Route::post('/households/multiple/upload', [HouseholdController::class, 'multipleUploads']);
Route::post('/lookup/add', [LookupController::class, 'addLookup']);
Route::post('/lookup/entry/add', [LookupController::class, 'addNewLookupEntry']);
Route::post('/household-container', [HouseholdContainerController::class, 'add']);

Route::put('/lookup', [LookupController::class, 'updateLookup']);
Route::put('/household/{id}', [HouseholdController::class, 'updateHousehold']);
Route::put('/household-member/{id}/status', [HouseholdController::class, 'updateMemberStatus']);
Route::put('/household/survey-status', [HouseholdController::class, 'updateSurveyStatus']);
Route::put('/household/{id}/update-container', [HouseholdController::class, 'updateHouseholdContainer']);
Route::put('/household/{id}/container', [HouseholdController::class, 'updateContainer']);
Route::put('/household-container/{id}', [HouseholdContainerController::class, 'update']);

Route::delete('/households', [HouseholdController::class, 'deleteHousehold']);
Route::delete('/household/member', [HouseholdController::class, 'deleteHouseholdMember']);
Route::delete('/lookup/entry', [LookupController::class, 'deleteLookupEntry']);
Route::delete('/lookup', [LookupController::class, 'deleteLookup']);
Route::delete('/household-container/{id}', [HouseholdContainerController::class, 'deleteContainer']);

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});
