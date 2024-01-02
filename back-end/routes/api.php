<?php

use App\Http\Controllers\ChatRoomController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
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

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', [UserController::class, 'getCurrentUser']);

    // Routes Chatrooms
    Route::get('/chatrooms', [ChatRoomController::class, 'index']);
    Route::get('/chatrooms/{id}', [ChatRoomController::class, 'show']);

    // Routes Messages
    Route::post('/message', [MessageController::class, 'store']);
});

// Routes Auth
Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);
Route::post('/logout', [UserController::class, 'logout']);
