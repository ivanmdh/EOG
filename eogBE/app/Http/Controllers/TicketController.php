<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketCierreRequest;
use App\Http\Requests\TicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Services\FotoHistorialService;
use Illuminate\Http\Request;

class TicketController extends Controller
{
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

        $query = Ticket::query()
            ->with(['usuario', 'direccion', 'luminaria', 'lampara', 'ticketTipoFalla']);

        // Aplicar búsqueda si se proporciona
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('IDTicket', 'like', "%{$search}%")
                  ->orWhere('descripcion', 'like', "%{$search}%")
                  ->orWhere('estado', 'like', "%{$search}%");
                
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
                          ->orWhereDate('updated_at', $searchDate)
                          ->orWhereDate('fecha_cierre', $searchDate);
                    }
                }
                
                $q->orWhereHas('usuario', function ($q) use ($search) {
                      $q->where('nombre', 'like', "%{$search}%")
                        ->orWhere('apellido', 'like', "%{$search}%");
                  });
            });
        }

        $tickets = $query->orderBy('IDTicket', 'desc')
            ->paginate($size, ['*'], 'page', $page);

        return response()->json([
            'data' => TicketResource::collection($tickets->items()),
            'total' => $tickets->total(),
            'per_page' => $tickets->perPage(),
            'current_page' => $tickets->currentPage(),
            'last_page' => $tickets->lastPage(),
            'from' => $tickets->firstItem(),
            'to' => $tickets->lastItem(),
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
