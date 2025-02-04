<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $perPage = request('perPage', 10);
        $page = $request->input('page', 1);

        $tickets = Ticket::query()
            ->orderBy('IDTicket', 'desc')
            ->paginate($perPage);

        return TicketResource::collection($tickets);
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

    public function destroy(Ticket $ticket)
    {
        //
    }
}
