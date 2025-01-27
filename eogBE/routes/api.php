<?php

use App\Http\Controllers\DireccionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LuminariaController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [LoginController::class, 'login']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('usuarios')->group(function () {
        Route::post('/', [UsuarioController::class, 'index']);
        Route::post('detalles', [UsuarioController::class, 'show']);
        Route::post('usuario', [UsuarioController::class, 'update']);
        Route::post('eliminar', [UsuarioController::class, 'destroy']);
        Route::prefix('roles')->group(function () {
            Route::post('/', [RolController::class, 'index']);
            Route::post('detalles', [RolController::class, 'show']);
            Route::post('rol', [RolController::class, 'update']);
            Route::post('eliminar', [RolController::class, 'destroy']);
        });
    });
    Route::prefix('tickets')->group(function () {
        Route::post('/', [TicketController::class, 'index']);
        Route::post('detalles', [TicketController::class, 'show']);
        Route::post('ticket', [TicketController::class, 'update']);
        Route::post('eliminar', [TicketController::class, 'destroy']);
    });
    Route::prefix('luminarias')->group(function () {
        Route::post('/', [LuminariaController::class, 'index']);
        Route::post('detalles', [LuminariaController::class, 'detalles']);
        Route::post('luminaria', [LuminariaController::class, 'actualizar']);
        Route::post('eliminar', [LuminariaController::class, 'eliminar']);
        Route::post('cargafoto', [LuminariaController::class, 'cargaFoto']);
    });
    Route::prefix('direcciones')->group(function () {
        Route::post('/', [DireccionController::class, 'index']);
    });
});
