<?php

namespace App\Http\Controllers;

use App\Http\Requests\RolRequest;
use App\Http\Resources\RolResource;
use App\Http\Resources\UsuarioResource;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Http\Request;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $usuarios = Rol::query()
            ->when($request->search, function($query, $search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate($perPage);

        return RolResource::collection($usuarios);
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
        return new RolResource(Rol::find($request->IDRol));
    }

    public function actualizar(RolRequest $request)
    {
        if ($request->IDRol) {
            $Rol = Rol::findOrFail($request->IDRol);
        } else {
            $Rol = new Rol();
        }
        $Rol->nombre = $request->nombre;
        $Rol->save();
        return response()->json([
            'success' => true,
            'message' => 'Rol guardada correctamente',
            'Rol' => $Rol,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Usuario $usuario)
    {
        //
    }
}
