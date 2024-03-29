<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HouseholdContainerController;
use App\Http\Controllers\LookupController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\ReportController;

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



Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('barangays', BarangayController::class);

    Route::get('users/all', [AuthController::class, 'showAll']);
    Route::get('container', [HouseholdContainerController::class, 'show']);
    Route::get('lookup', [LookupController::class, 'show']);
    Route::get('lookup-list', [LookupController::class, 'showLookupList']);
    Route::get('household/{barangay}', [HouseholdController::class, 'showFromBarangay']);
    Route::get('household', [HouseholdController::class, 'show']);
    Route::get('household-list', [HouseholdController::class, 'findHousehold']);
    Route::get('household-member', [HouseholdController::class, 'findHouseholdMember']);
    Route::get('/reports/generate', [ReportController::class, 'generate']);
    Route::get('get-rbi', [ReportController::class, 'getRbi']);
    Route::get('/report/custom', [ReportController::class, 'generateCustomReport']);
    Route::get('/barangays/datatables', [BarangayController::class, 'datatables']);
    Route::get('/user/{id}', [AuthController::class, 'showUser']);

    Route::post('addHousehold', [HouseholdController::class, 'addHousehold']);
    Route::post('addMember', [HouseholdController::class, 'addMember']);
    Route::post('updateMember', [HouseholdController::class, 'updateMember']);
    Route::post('updateDeceasedMember', [HouseholdController::class, 'updateDeceasedMember']);
    Route::post('/households/multiple/upload', [HouseholdController::class, 'multipleUploads']);
    Route::post('/lookup/add', [LookupController::class, 'addLookup']);
    Route::post('/lookup/entry/add', [LookupController::class, 'addNewLookupEntry']);
    Route::post('/household-container', [HouseholdContainerController::class, 'add']);
    Route::post('/indicator/count', [ReportController::class, 'countOfIndicators']);

    Route::put('/household/survey-status', [HouseholdController::class, 'updateSurveyStatus']);
    Route::put('/lookup', [LookupController::class, 'updateLookup']);
    Route::put('/household/{id}', [HouseholdController::class, 'updateHousehold']);
    Route::put('/household-member/{id}/status', [HouseholdController::class, 'updateMemberStatus']);
    Route::put('/household/{id}/update-container', [HouseholdController::class, 'updateHouseholdContainer']);
    Route::put('/household/{id}/container', [HouseholdController::class, 'updateContainer']);
    Route::put('/household-container/{id}', [HouseholdContainerController::class, 'update']);

    Route::patch('/user/{id}', [AuthController::class, 'updateUser']);

    Route::delete('/households', [HouseholdController::class, 'deleteHousehold']);
    Route::delete('/household/member', [HouseholdController::class, 'deleteHouseholdMember']);
    Route::delete('/lookup/entry', [LookupController::class, 'deleteLookupEntry']);
    Route::delete('/lookup', [LookupController::class, 'deleteLookup']);
    Route::delete('/household-container/{id}', [HouseholdContainerController::class, 'deleteContainer']);
    Route::delete('/user/{id}', [AuthController::class, 'deleteUser'])->middleware('auth:sanctum');

    // Dashboard
    Route::get('dashboard/member/count-lookup/{column_number}/{lookup_number}', [DashboardController::class, 'countLookup']);
    Route::get('dashboard/member/count/{column_number}', [DashboardController::class, 'count']);
});

Route::get('dashboard/household/member/count', [DashboardController::class, 'countMembers']);
Route::get('dashboard/household/count', [DashboardController::class, 'countHousehold']);
