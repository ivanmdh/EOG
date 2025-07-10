<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthLoggingMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Procesar la solicitud y obtener la respuesta
        $response = $next($request);

        $responseBody = json_decode($response->getContent(), true);

        // Si el login es exitoso y tenemos datos de usuario, filtramos la información
        if ($response->isSuccessful() && isset($responseBody['user']['IDUsuario'])) {
            $responseBody = [
                'status' => $responseBody['status'] ?? 'success',
                'user' => ['IDUsuario' => $responseBody['user']['IDUsuario']]
            ];
        }

        // Preparar los datos para el log
        $logData = [
            'timestamp' => now()->toDateTimeString(),
            'ip_address' => $request->ip(),
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'request_body' => $request->except(['password']), // Excluimos el password por seguridad
            'response_status' => $response->getStatusCode(),
            'response_body' => $responseBody,
            'user_agent' => $request->header('User-Agent'),
        ];

        // Escribir en el log
        Log::channel('daily')->info('Login Attempt:', $logData);

        return $response;
    }
}
