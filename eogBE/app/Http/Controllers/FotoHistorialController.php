<?php

namespace App\Http\Controllers;

use App\Models\LuminariaFoto;
use App\Services\FotoHistorialService;
use Illuminate\Http\Request;

class FotoHistorialController extends Controller
{
    protected $fotoHistorialService;

    public function __construct(FotoHistorialService $fotoHistorialService)
    {
        $this->fotoHistorialService = $fotoHistorialService;
    }

    /**
     * Obtiene el historial completo de fotos de una lámpara
     */
    public function historialLampara(Request $request)
    {
        $request->validate([
            'IDLampara' => 'required|integer|exists:luminarias_lamparas,IDLampara'
        ]);

        $historial = $this->fotoHistorialService->obtenerHistorialFotos($request->IDLampara);

        return response()->json([
            'success' => true,
            'data' => $historial,
        ]);
    }

    /**
     * Encuentra fotos huérfanas en el sistema
     */
    public function fotosHuerfanas()
    {
        $fotosHuerfanas = $this->fotoHistorialService->encontrarFotosHuerfanas();

        return response()->json([
            'success' => true,
            'data' => $fotosHuerfanas,
            'total' => $fotosHuerfanas->count(),
        ]);
    }

    /**
     * Valida si una foto tiene relaciones válidas
     */
    public function validarFoto(Request $request)
    {
        $request->validate([
            'IDFoto' => 'required|integer|exists:luminarias_fotos,IDFoto'
        ]);

        $esValida = $this->fotoHistorialService->validarFoto($request->IDFoto);

        return response()->json([
            'success' => true,
            'es_valida' => $esValida,
            'mensaje' => $esValida ? 'La foto tiene relaciones válidas' : 'La foto está huérfana'
        ]);
    }

    /**
     * Obtiene estadísticas de uso de fotos
     */
    public function estadisticas()
    {
        $totalFotos = LuminariaFoto::count();
        $fotosHuerfanas = $this->fotoHistorialService->encontrarFotosHuerfanas()->count();
        $fotosEnUso = $totalFotos - $fotosHuerfanas;

        // Estadísticas por uso
        $stats = [
            'total_fotos' => $totalFotos,
            'fotos_en_uso' => $fotosEnUso,
            'fotos_huerfanas' => $fotosHuerfanas,
            'porcentaje_uso' => $totalFotos > 0 ? round(($fotosEnUso / $totalFotos) * 100, 2) : 0,
        ];

        return response()->json([
            'success' => true,
            'estadisticas' => $stats,
        ]);
    }

    /**
     * Limpia fotos huérfanas (soft delete)
     */
    public function limpiarFotosHuerfanas()
    {
        $fotosHuerfanas = $this->fotoHistorialService->encontrarFotosHuerfanas();
        $cantidad = $fotosHuerfanas->count();
        
        foreach ($fotosHuerfanas as $foto) {
            $foto->delete(); // Soft delete
        }

        return response()->json([
            'success' => true,
            'message' => "Se eliminaron {$cantidad} fotos huérfanas",
            'cantidad_eliminadas' => $cantidad,
        ]);
    }
}
