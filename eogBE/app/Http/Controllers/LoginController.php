<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'usuario' => 'required|exists:usuarios,usuario',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'user' => $user,
                'Authorization' => [
                    'accessToken'  => $token,
                    'csrfToken'    => csrf_token(),
                    'type'         => 'Bearer',
                ],
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Credenciales inválidas'
        ], 401);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Sesión cerrada exitosamente'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'user' => auth()->user()
        ]);
    }
}
