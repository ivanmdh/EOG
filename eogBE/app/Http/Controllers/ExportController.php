<?php

namespace App\Http\Controllers;

use App\Exports\LuminariasExport;
use App\Exports\DireccionesExport;
use App\Exports\LamparasExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    public function exportLuminarias(Request $request)
    {
        // Obtener rangos de fechas del request
        $fechaInicio = $request->input('fecha_inicio');
        $fechaFin = $request->input('fecha_fin');
        
        return Excel::download(new LuminariasExport($fechaInicio, $fechaFin), 'censo_luminarias.xlsx');
    }
    
    public function exportDirecciones(Request $request)
    {
        // Obtener rangos de fechas del request
        $fechaInicio = $request->input('fecha_inicio');
        $fechaFin = $request->input('fecha_fin');
        
        return Excel::download(new DireccionesExport($fechaInicio, $fechaFin), 'direcciones.xlsx');
    }

    public function exportLamparas(Request $request)
    {
        // Exportación simple sin filtros de fecha
        return Excel::download(new LamparasExport(), 'censo_lamparas.xlsx');
    }
}
