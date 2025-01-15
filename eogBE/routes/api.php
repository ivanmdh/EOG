<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', 'AuthController@login');
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
