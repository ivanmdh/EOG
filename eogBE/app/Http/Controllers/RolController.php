<?php

namespace App\Http\Controllers;

use App\Http\Requests\RolRequest;
use App\Http\Resources\RolResource;
use App\Models\Rol;
use Illuminate\Http\Request;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = $request->input('size', 20);
        $page = $request->input('page', 1);
        $search = $request->input('search', '');

        $query = Rol::query();

        // Aplicar búsqueda si se proporciona
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('IDRol', 'like', "%{$search}%")
                  ->orWhere('nombre', 'like', "%{$search}%");
                
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
            });
        }

        $roles = $query->orderBy('IDRol', 'desc')
            ->paginate($size, ['*'], 'page', $page);

        return response()->json([
            'data' => RolResource::collection($roles->items()),
            'total' => $roles->total(),
            'per_page' => $roles->perPage(),
            'current_page' => $roles->currentPage(),
            'last_page' => $roles->lastPage(),
            'from' => $roles->firstItem(),
            'to' => $roles->lastItem(),
        ]);
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
            'message' => 'Rol guardado correctamente',
            'Rol' => $Rol,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function eliminar(Request $request)
    {
        $Rol = Rol::findOrFail($request->IDRol);
        $Rol->delete();
        return response()->json([
            'success' => true,
            'message' => 'Rol eliminado correctamente',
        ]);
    }
}
