<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProxyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware('api')->group(function () {
//     Route::get('auth/check', [AuthController::class, 'check']);
// });

// Creating Route for Proxy, Ref: https://dev.to/azophy/using-laravel-as-a-service-proxygateway-3ig9

// NOTE: add other route above 'user-service' route and pass to the 'ProxyController' 'forward' method

// '/<user_service>' route
Route::any('/{path}', [ProxyController::class, 'forward'])->where('path', '.*');
