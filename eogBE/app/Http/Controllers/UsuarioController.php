<?php

namespace App\Http\Controllers;

use App\Http\Requests\UsuarioRequest;
use App\Http\Resources\UsuarioResource;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 100);
        $page = $request->input('page', 1);

        $usuarios = Usuario::query()
            ->when($request->search, function($query, $search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate($perPage);

        return UsuarioResource::collection($usuarios);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUsuarioRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function detalles(Request $request)
    {
        return new UsuarioResource(Usuario::find($request->IDUsuario));
    }

    /**
     * Update the specified resource in storage.
     */
    public function actualizar(UsuarioRequest $request)
    {
        if ($request->IDUsuario) {
            $usuario = Usuario::findOrFail($request->IDUsuario);
        } else {
            $usuario = new Usuario();
        }
        $usuario->IDRol = $request->IDRol;
        $usuario->nombre = $request->nombre;
        $usuario->apellido = $request->apellido;
        $usuario->email = $request->email;
        $usuario->usuario = $request->usuario;
        if ($request->password) {
            $usuario->password = Hash::make($request->password);
        }

        $usuario->save();
        return response()->json([
            'success' => true,
            'data' => new UsuarioResource($usuario),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function eliminar(Request $request)
    {
        $usuario = Usuario::findOrFail($request->IDUsuario);
        $usuario->delete();
        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado correctamente',
        ]);
    }
}
