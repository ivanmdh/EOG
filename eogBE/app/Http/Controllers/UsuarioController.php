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
        $size = $request->input('size', 20);
        $page = $request->input('page', 1);
        $search = $request->input('search', '');

        $query = Usuario::query()
            ->with(['rol']);

        // Aplicar búsqueda si se proporciona
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('IDUsuario', 'like', "%{$search}%")
                  ->orWhere('nombre', 'like', "%{$search}%")
                  ->orWhere('apellido', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('usuario', 'like', "%{$search}%");
                
                // Búsqueda por fecha (dd/mm/yyyy o dd/mm/yy)
                if (preg_match('/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/', $search, $matches)) {
                    $day = str_pad($matches[1], 2, '0', STR_PAD_LEFT);
                    $month = str_pad($matches[2], 2, '0', STR_PAD_LEFT);
                    $year = $matches[3];
                    
                    // Si el año tiene 2 dígitos, convertir a 4 dígitos
                    if (strlen($year) == 2) {
                        $currentYear = date('Y');
                        $currentCentury = substr($currentYear, 0, 2);
                        $year = $currentCentury . $year;
                    }
                    
                    // Crear la fecha en formato Y-m-d para la búsqueda
                    $searchDate = $year . '-' . $month . '-' . $day;
                    
                    // Validar que la fecha sea válida
                    if (checkdate($month, $day, $year)) {
                        $q->orWhereDate('created_at', $searchDate)
                          ->orWhereDate('updated_at', $searchDate);
                    }
                }
                
                $q->orWhereHas('rol', function ($q) use ($search) {
                      $q->where('nombre', 'like', "%{$search}%");
                  });
            });
        }

        $usuarios = $query->orderBy('IDUsuario', 'desc')
            ->paginate($size, ['*'], 'page', $page);

        return response()->json([
            'data' => UsuarioResource::collection($usuarios->items()),
            'total' => $usuarios->total(),
            'per_page' => $usuarios->perPage(),
            'current_page' => $usuarios->currentPage(),
            'last_page' => $usuarios->lastPage(),
            'from' => $usuarios->firstItem(),
            'to' => $usuarios->lastItem(),
        ]);
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
