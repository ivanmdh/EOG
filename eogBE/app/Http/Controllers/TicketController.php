<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketCierreRequest;
use App\Http\Requests\TicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Services\FotoHistorialService;
use App\Traits\SmartSearchTrait;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    use SmartSearchTrait;
    
    protected $fotoHistorialService;

    public function __construct(FotoHistorialService $fotoHistorialService)
    {
        $this->fotoHistorialService = $fotoHistorialService;
    }
    public function index(Request $request)
    {
        $size = $request->input('size', 20);
        $page = $request->input('page', 1);
        $search = $request->input('search', '');
        $sortBy = $request->input('sort_by', '');
        $sortDirection = $request->input('sort_direction', 'desc');

        $query = Ticket::query()
            ->with(['usuario', 'direccion', 'luminaria', 'lampara', 'ticketTipoFalla']);

        // Configuración para búsqueda inteligente
        $searchConfig = [
            'folio_column' => 'IDTicket',
            'date_columns' => ['created_at', 'updated_at', 'fecha_cierre'],
            'estado_columns' => ['estado'],
            'estado_map' => [
                0 => 'Cerrado',
                1 => 'Nuevo',
                2 => 'En proceso',
                3 => 'Finalizado'
            ],
            'free_columns' => ['descripcion', 'observaciones'],
            'relations' => [
                'usuario' => ['nombre', 'apellido', 'email', 'usuario'],
                'direccion' => ['nombre', 'direccion', 'colonia', 'num_cuenta', 'rpu'],
                'ticketTipoFalla' => ['descripcion']
            ],
            // Configuración de ordenamiento simplificada
            'default_sort' => ['IDTicket', 'desc'],
            'sortable_columns' => [
                'IDTicket',
                'descripcion', 
                'estado',
                'created_at',
                'updated_at',
                'fecha_cierre'
            ],
            // Mapeo de campos del frontend a campos de la base de datos
            'field_mapping' => [
                'folio' => 'IDTicket',
                'fecha' => 'created_at'
            ],
            // Configuración para ordenamiento automático por relaciones
            'auto_relation_sort' => true,
            'relation_sorts' => [
                'usuario' => [
                    'table' => 'usuarios',
                    'select_column' => 'nombre',
                    'where_column' => 'tickets.IDUsuario',
                    'equals_column' => 'usuarios.IDUsuario'
                ]
            ]
        ];

        // Aplicar búsqueda inteligente
        $query = $this->applySmartSearch($query, $search, $searchConfig);

        // Aplicar ordenamiento
        $query = $this->applySorting($query, $sortBy, $sortDirection, $searchConfig);

        $tickets = $query->paginate($size, ['*'], 'page', $page);

        return response()->json([
            'data' => TicketResource::collection($tickets->items()),
            'total' => $tickets->total(),
            'per_page' => $tickets->perPage(),
            'current_page' => $tickets->currentPage(),
            'last_page' => $tickets->lastPage(),
            'from' => $tickets->firstItem(),
            'to' => $tickets->lastItem(),
            'sort_by' => $sortBy,
            'sort_direction' => $sortDirection,
        ]);
    }

    public function detalles(Request $ticket)
    {
        return new TicketResource(Ticket::find($ticket->IDTicket));
    }

    public function actualizar(TicketRequest $request)
    {
        $data = $request->validated();
        $ticket = new Ticket();
        $ticket->IDUsuario = $data['IDUsuario'];
        $ticket->IDDireccion = $data['IDDireccion'];
        $ticket->IDLuminaria = $data['IDLuminaria'];
        $ticket->IDLampara = $data['IDLampara'];
        $ticket->IDTipoFalla = $data['IDTipoFalla'];
        $ticket->descripcion = $data['descripcion'];
        $ticket->estado = $data['estado'];
        $ticket->save();
        return response()->json([
            'success' => true,
            'message' => 'Ticket creado correctamente',
            'ticket' => $ticket,
        ]);
    }

    public function cerrar(TicketCierreRequest $request)
    {
        $Ticket = Ticket::find($request->IDTicket);
        
        if (!$Ticket) {
            return response()->json([
                'success' => false,
                'message' => 'Ticket no encontrado',
            ], 404);
        }

        // Completar los datos del ticket
        $Ticket->IDUsuario_cierre = $request->IDUsuario_cierre;
        $Ticket->IDTipoReparacion = $request->IDTipoReparacion;
        $Ticket->observaciones = $request->observaciones;
        $Ticket->estado = 0;
        $Ticket->fecha_cierre = now();

        // Procesar el historial de fotos usando el servicio
        $procesoExitoso = $this->fotoHistorialService->procesarCierreTicket($Ticket, $request->IDFoto);
        
        if (!$procesoExitoso) {
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar el historial de fotos del ticket',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Ticket cerrado correctamente',
            'ticket' => $Ticket,
        ]);
    }

    public function eliminar(Request $request)
    {
        $Ticket = Ticket::findOrFail($request->IDTicket);
        $Ticket->delete();
        return response()->json([
            'success' => true,
            'message' => 'Ticket eliminado correctamente',
        ]);
    }

    /**
     * Obtiene el historial de fotos de una lámpara
     */
    public function historialFotos(Request $request)
    {
        $request->validate([
            'IDLampara' => 'required|integer|exists:luminarias_lamparas,IDLampara'
        ]);

        $historial = $this->fotoHistorialService->obtenerHistorialFotos($request->IDLampara);

        return response()->json([
            'success' => true,
            'historial' => $historial,
        ]);
    }
}
