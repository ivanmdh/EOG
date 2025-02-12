<?php

use App\Http\Controllers\DireccionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LuminariaController;
use App\Http\Controllers\ResumenController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UsuarioController;
use App\Http\Resources\SelectResource;
use App\Models\Rol;
use App\Models\TicketTipoFalla;
use App\Models\TicketTipoReparacion;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [LoginController::class, 'login']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('resumen')->group(function () {
       Route::post('/', [ResumenController::class, 'index']);
       Route::post('tickets', [ResumenController::class, 'tickets']);
    });
    Route::prefix('usuarios')->group(function () {
        Route::post('/', [UsuarioController::class, 'index']);
        Route::post('detalles', [UsuarioController::class, 'detalles']);
        Route::post('usuario', [UsuarioController::class, 'actualizar']);
        Route::post('eliminar', [UsuarioController::class, 'eliminar']);
        Route::prefix('roles')->group(function () {
            Route::post('/', [RolController::class, 'index']);
            Route::post('detalles', [RolController::class, 'detalles']);
            Route::post('rol', [RolController::class, 'actualizar']);
            Route::post('eliminar', [RolController::class, 'eliminar']);
        });
    });
    Route::prefix('tickets')->group(function () {
        Route::post('/', [TicketController::class, 'index']);
        Route::post('detalles', [TicketController::class, 'detalles']);
        Route::post('ticket', [TicketController::class, 'actualizar']);
        Route::post('cerrar', [TicketController::class, 'cerrar']);
        Route::post('eliminar', [TicketController::class, 'destroy']);
    });
    Route::prefix('luminarias')->group(function () {
        Route::post('/', [LuminariaController::class, 'index']);
        Route::post('detalles', [LuminariaController::class, 'detalles']);
        Route::post('luminaria', [LuminariaController::class, 'actualizar']);
        Route::post('eliminar', [LuminariaController::class, 'eliminar']);
        Route::post('cargafoto', [LuminariaController::class, 'cargaFoto']);
        Route::get('mapa/{IDDireccion?}', [LuminariaController::class, 'mapa']);
    });
    Route::prefix('direcciones')->group(function () {
        Route::post('/', [DireccionController::class, 'index']);
    });
    Route::prefix('opciones')->group(function () {
        Route::post('fallas', function () {
            return SelectResource::collection(TicketTipoFalla::all());
        });
        Route::post('reparaciones', function () {
            return SelectResource::collection(TicketTipoReparacion::all());
        });
        Route::post('roles', function () {
            return SelectResource::collection(Rol::all());
        });
    });
});
Route::get('foto/{hash}/{tipo?}', [LuminariaController::class, 'obtenerFoto']);

Route::get('test', function () {
    return response()->json(['message' => 'GET test']);
});
Route::post('test', function () {
    return response()->json(['message' => 'POST test', 'data' => request()->all()]);
});
