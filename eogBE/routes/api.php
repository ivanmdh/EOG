<?php

use App\Http\Controllers\DireccionController;
use App\Http\Controllers\EmergenciaController;
use App\Http\Controllers\ExportController;
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
    Route::post('login', [LoginController::class, 'login'])->middleware('auth.logging');
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::prefix('export')->group(function () {
        Route::post('luminarias', [ExportController::class, 'exportLuminarias']);
        Route::post('direcciones', [ExportController::class, 'exportDirecciones']);
        Route::post('lamparas', [ExportController::class, 'exportLamparas']);
    });

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
        Route::post('eliminar', [TicketController::class, 'eliminar']);
    });
    Route::prefix('luminarias')->group(function () {
        Route::post('/', [LuminariaController::class, 'index']);
        Route::post('detalles', [LuminariaController::class, 'detalles']);
        Route::post('luminaria', [LuminariaController::class, 'actualizar']);
        Route::post('eliminar', [LuminariaController::class, 'eliminar']);
        Route::post('cargafoto', [LuminariaController::class, 'cargaFoto']);
        Route::get('mapa/{IDDireccion?}', [LuminariaController::class, 'mapa']);
        Route::post('mapa', [LuminariaController::class, 'mapa']);
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

// Ruta de emergencia - USAR SOLO EN CASOS DE NECESIDAD EXTREMA
// Esta ruta no requiere autenticación para poder acceder en caso de que no existan usuarios válidos
Route::get('emergencia/restaurar-admin/{codigo_secreto}', [EmergenciaController::class, 'restaurarAdmin'])
    ->where('codigo_secreto', 'EOG-EMERGENCY-ACCESS-9876');

// Ruta de diagnóstico del sistema
Route::get('emergencia/diagnostico/{codigo_secreto}', [EmergenciaController::class, 'diagnostico'])
    ->where('codigo_secreto', 'EOG-EMERGENCY-ACCESS-9876');

Route::get('test', function () {
    return response()->json(['message' => 'GET test']);
});
Route::post('test', function () {
    return response()->json(['message' => 'POST test', 'data' => request()->all()]);
});
