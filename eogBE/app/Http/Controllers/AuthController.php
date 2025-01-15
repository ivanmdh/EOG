<?php

namespace App\Http\Controllers\Login;

use App\Http\Controllers\Controller;
use App\Http\Request\Login\LoginRequest;
use App\Http\Resources\Usuario\UsuarioResource;
use App\Models\Empresa\Empresa;
use App\Models\Usuario\Usuario;
use App\Notifications\UsuarioReseteoNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
	public function login(LoginRequest $request)
	{
		$Validacion = $request->validated();
		$Empresa    = Empresa::where('subdominio', 'LIKE', $Validacion['subdominio'])->first();
		if (!is_null($Empresa)) {
			Auth::logout();
			if (!Auth::check()) {
				$Usuario = Usuario::where('IDEmpresa', $Empresa->IDEmpresa)->where('usuario', $Validacion['usuario'])->first();
				if ($Usuario) {
					$Auth = Hash::check($Validacion['password'], $Usuario->password);
					if ($Auth) {
						Auth::loginUsingId($Usuario->IDUsuario);
						$Token = $Usuario->createToken('authToken')->plainTextToken;
						return response()->json([
							'success'       => true,
							'userData'      => new UsuarioResource($Usuario),
							'Authorization' => [
								'accessToken'  => $Token,
								'refreshToken' => $Token,
								'csrfToken'    => csrf_token(),
								'type'         => 'Bearer',
							],
						]);
					}
				}
			}
		}
        Log::warning('Login: Intento de acceso fallido', [
            'subdominio' => $Validacion['subdominio'],
            'usuario' => $Validacion['usuario'],
            'password' => $Validacion['password'],
        ]);
        return response()->json([
            'status'  => 'error',
            'message' => 'Usuario no encontrado',
        ], 422);
	}

	public function session(Request $request)
	{
		if (Auth::check()) {
			return response()->json([
				'success'       => true,
				'userData'      => new UsuarioResource(Auth::user()),
				'Authorization' => [
					'accessToken'  => $request->bearerToken(),
					'refreshToken' => $request->bearerToken(),
					'csrfToken'    => csrf_token(),
					'type'         => 'Bearer',
				],
			]);
		}
	}

	public function refresh()
	{
		if (Auth::check()) {
			$Usuario = Auth::user();
			$Token   = $Usuario->createToken('authToken')->plainTextToken;
			return response()->json([
				'success'       => true,
				'userData'      => new UsuarioResource(Auth::user()),
				'Authorization' => [
					'accessToken'  => $Token,
					'refreshToken' => $Token,
					'csrfToken'    => csrf_token(),
					'type'         => 'Bearer',
				],
			]);
		}
	}

	public function logout(Request $request)
	{
		$Usuario = Auth::user();
		$Usuario->tokens()->delete();
		$request->session()->flush();
		$request->session()->invalidate();
		return response()->json([
			'status'  => 'Success',
			'message' => 'Sesion cerrada - Hasta la Vista Baby!',
		]);
	}

	public function bypasstoken(Request $request)
	{
		$Usuarios = Usuario::where('api_token', base64_decode($request->token))->where('IDEmpresa', 1065)->get();
		if ($Usuarios->count() === 1) {
			$subdominio = isset($_SERVER['HTTP_ORIGIN']) ? explode('.', parse_url($_SERVER['HTTP_ORIGIN'])['host'])[0] : 'www';
			$Empresa    = Empresa::where('subdominio', 'LIKE', $subdominio)->first();
			$Usuario    = Usuario::where('IDEmpresa', $Empresa->IDEmpresa)
				->whereNull('deleted_at')
				->orderBy('FolioInt', 'asc')
				->first();
			$Auth = Auth::loginUsingId($Usuario->IDUsuario);
			if ($Auth) {
				$Token = $Usuario->createToken('Sesion')->plainTextToken;
				return response()->json([
					'status' => 'Success',
					'token'  => $Token,
				]);
			}
		}
		return response()->json([
			'status'  => 'error',
			'message' => 'Token no valido',
		], 422);
	}

	public function tokenizador(Request $request)
	{
		isset($request->token) ? $Token = $request->token : $Token = null;
		if (!is_null($Token)) {
			$token = PersonalAccessToken::findToken($Token);
			if ($token) {
				$Usuario = $token->tokenable;
				return response()->json([
					'status'        => 'Success',
					'userData'      => new UsuarioResource($Usuario),
					'Authorization' => [
						'accessToken'  => $Token,
						'refreshToken' => $Token,
						'type'         => 'Bearer',
					],
				]);
			}
		}
		return response()->json([
			'status'  => 'error',
			'message' => 'Token no valido',
		], 422);
	}

    public function recuperacion(Request $request)
    {
        $request->validate([
            'subdominio' => ['required', 'string', 'max:255', 'exists:Empresas,subdominio'],
            'correo' => 'required|email',
        ]);
        $Empresa = Empresa::where('subdominio', 'LIKE', $request->subdominio)->first();
        $Usuario = Usuario::where('IDEmpresa', $Empresa->IDEmpresa)->where('correo', $request->correo)->first();
        if ($Usuario) {
            $Usuario->password_reset = Hash::make(Str::random(10));
            $Usuario->save();
            $Usuario->notify(new UsuarioReseteoNotification($Usuario));
            return response()->json([
                'status'  => 'Success',
                'message' => 'Correo enviado',
            ]);
        } else {
            Log::warning('Recuperacion: Intento de recuperacion fallido', [
                'subdominio' => $request->subdominio,
                'correo' => $request->correo,
            ]);
        }
        //Como medida de seguridad se envia el mismo mensaje de exito
        return response()->json([
            'status'  => 'Success',
            'message' => 'Correo enviado',
        ]);
    }

    public function recuperar (Request $request)
    {
        $request->validate([
            'subdominio' => ['required', 'string', 'max:255', 'exists:Empresas,subdominio'],
            'token' => ['required', 'string', 'regex:/^[A-Za-z0-9+\/]+={0,2}$/'],
            'password' => ['required', 'string', 'min:8'],
        ]);
        $Token = base64_decode($request->token);
        if($Token) {
            $Empresa = Empresa::where('subdominio', 'LIKE', $request->subdominio)->first();
            $Usuario = Usuario::where('IDEmpresa', $Empresa->IDEmpresa)->where('password_reset', base64_decode($request->token))->first();
            if ($Usuario) {
                $Usuario->password = Hash::make($request->password);
                $Usuario->password_reset = null;
                $Usuario->save();

                return response()->json([
                    'status'  => 'Success',
                    'message' => 'Contraseña actualizada',
                ]);
            }
        }
        return response()->json([
            'status'  => 'error',
            'message' => 'Token no valido',
        ], 422);
    }
}