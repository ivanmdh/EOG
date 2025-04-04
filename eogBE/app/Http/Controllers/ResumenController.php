<?php

namespace App\Http\Controllers;

use App\Models\Luminaria;
use App\Models\Rol;
use App\Models\Ticket;
use Illuminate\Http\Request;

class ResumenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $Periodo = $request->input('periodo', 1);
        $Periodos = [
            1 => [now()->startOfDay(), now()->endOfDay()],
            2 => [now()->subDay()->startOfDay(), now()->subDay()->endOfDay()],
            3 => [now()->startOfWeek(), now()->endOfWeek()],
            4 => [now()->subWeek()->startOfWeek(), now()->subWeek()->endOfWeek()],
            5 => [now()->startOfMonth(), now()->endOfMonth()],
            6 => [now()->subMonth()->startOfMonth(), now()->subMonth()->endOfMonth()],
        ];
        $Periodo = $Periodos[$Periodo];
        $roles = Rol::all();
        $resumen = [];
        foreach ($roles as $rol) {
            $IDUsuariosRol = $rol->usuarios->pluck('IDUsuario');
            $Luminarias = Luminaria::whereIn('IDUsuario', $IDUsuariosRol)->whereBetween('created_at', $Periodo)->count();
            $TicketsCreados = Ticket::whereIn('IDUsuario', $IDUsuariosRol)->whereBetween('created_at', $Periodo)->count();
            $TicketsCerrados = Ticket::whereIn('IDUsuario_cierre', $IDUsuariosRol)->whereBetween('fecha_cierre', $Periodo)->count();
            $resumen[] = [
                'rol' => $rol->nombre,
                'luminarias' => $Luminarias,
                'tickets_creados' => $TicketsCreados,
                'tickets_cerrados' => $TicketsCerrados,
            ];
        }
        return response()->json($resumen);
    }

    public function tickets()
    {
        $tickets_abiertos = Ticket::where('estado', 1)->count();
        $tickets_cerrados = Ticket::where('estado', 0)->count();
        $tickets_reconexion = Ticket::where('IDTipoReparacion', 1)->count();
        $tickets_cambio = Ticket::where('IDTipoReparacion', 2)->count();
        return response()->json([
            'tickets_abiertos' => $tickets_abiertos,
            'tickets_cerrados' => $tickets_cerrados,
            'tickets_reconexion' => $tickets_reconexion,
            'tickets_cambio' => $tickets_cambio,
        ]);
    }

}
