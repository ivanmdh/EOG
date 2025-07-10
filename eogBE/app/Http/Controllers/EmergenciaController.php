<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmergenciaController extends Controller
{
    /**
     * Restaura el usuario administrador y restablece su contraseña.
     * Esta ruta es SOLAMENTE para uso en situaciones de emergencia.
     * No debería estar disponible en producción a menos que sea absolutamente necesario.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function restaurarAdmin()
    {
        try {
            // Buscamos si existe un usuario admin, incluso si está eliminado (withTrashed)
            $admin = Usuario::withTrashed()
                ->where(function($query) {
                    $query->where('email', 'like', '%admin%')
                          ->orWhere('email', 'like', '%root%')
                          ->orWhere('email', 'like', '%superuser%')
                          ->orWhere('nombre', 'like', '%admin%')
                          ->orWhere('nombre', 'like', '%Admin%');
                })
                ->first();

            // Si no encontramos ningún usuario que parezca admin, tomamos el usuario con el ID más bajo
            if (!$admin) {
                $admin = Usuario::withTrashed()
                    ->orderBy('IDUsuario', 'asc')
                    ->first();
            }

            if (!$admin) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se encontró ningún usuario en el sistema'
                ], 500);
            }

            // Si el usuario estaba eliminado, lo restauramos
            if ($admin->trashed()) {
                $admin->restore();
            }

            // Restablecemos la contraseña
            $admin->password = Hash::make('Pa55w0rD');
            $admin->save();

            // Registrar la acción en los logs
            \Log::warning("EMERGENCIA: Se ha restablecido la contraseña del usuario {$admin->email} (ID: {$admin->IDUsuario}) a través de la ruta de emergencia.");

            return response()->json([
                'success' => true,
                'message' => 'Usuario administrador restaurado y contraseña restablecida',
                'usuario' => [
                    'id' => $admin->IDUsuario,
                    'email' => $admin->email,
                    'nombre' => $admin->nombre ?? 'No especificado'
                ],
                'credenciales' => [
                    'email' => $admin->email,
                    'password' => 'Pa55w0rD' // Mostramos la contraseña para que el usuario la conozca
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error("Error en ruta de emergencia: " . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error al intentar restaurar el usuario administrador',
                'error' => $e->getMessage(),
                'sugerencia' => 'Intente acceder a esta ruta desde un dispositivo diferente o utilizando otro método como curl o Postman'
            ], 500);
        }
    }

    /**
     * Proporciona información de diagnóstico sobre el sistema
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function diagnostico()
    {
        try {
            // Información sobre usuarios
            $totalUsuarios = Usuario::count();
            $totalUsuariosEliminados = Usuario::onlyTrashed()->count();
            
            // Información sobre la base de datos
            $databaseInfo = config('database.connections.' . config('database.default'));
            // Removemos información sensible
            if (isset($databaseInfo['password'])) {
                unset($databaseInfo['password']);
            }
            
            return response()->json([
                'success' => true,
                'diagnostico' => [
                    'usuarios' => [
                        'total' => $totalUsuarios,
                        'eliminados' => $totalUsuariosEliminados
                    ],
                    'database' => [
                        'driver' => $databaseInfo['driver'] ?? 'desconocido',
                        'host' => $databaseInfo['host'] ?? 'desconocido',
                        'database' => $databaseInfo['database'] ?? 'desconocido'
                    ],
                    'aplicacion' => [
                        'version' => config('app.version', 'desconocida'),
                        'entorno' => config('app.env'),
                        'url' => config('app.url'),
                        'fecha_diagnostico' => now()->format('Y-m-d H:i:s')
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al generar diagnóstico',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
