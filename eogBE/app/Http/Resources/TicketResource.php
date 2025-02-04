<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $estado = $this->estado == 1 ? 'Nuevo' : ($this->estado == 2 ? 'En proceso' : 'Finalizado');
        return [
            'IDTicket' => $this->IDTicket,
            'folio' => 'TC'.str_pad($this->IDTicket, 5, '0', STR_PAD_LEFT),
            'descripcion' => $this->descripcion,
            'estado' => $estado
        ];
    }
}
