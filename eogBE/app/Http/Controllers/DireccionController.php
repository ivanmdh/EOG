<?php

namespace App\Http\Controllers;

use App\Http\Resources\DireccionResource;
use App\Http\Resources\UsuarioResource;
use App\Models\Direccion;
use App\Models\Usuario;
use Illuminate\Http\Request;

class DireccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 100);
        $page = $request->input('page', 1);

        $direcciones = Direccion::query()
            ->when($request->search, function($query, $search) {
                $query->where('direccion', 'like', "%{$search}%");
                $query->orWhere('rpu', 'like', "%{$search}%");
            })
            ->paginate($perPage);

        return DireccionResource::collection($direcciones);
    }

}
