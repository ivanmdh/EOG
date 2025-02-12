<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
        $host = config('app.url');
        $host = str_replace('http://', '', $host);
        $host = str_replace('https://', '', $host);
        if (app()->environment('local')) {
            $host = 'http://api.'.$host.':8000';
        } else {
            $host = 'https://api.'.$host;
        }
        return [
            'IDTicket' => $this->IDTicket,
            'folio' => 'TC' . str_pad($this->IDTicket, 5, '0', STR_PAD_LEFT),

            'direccion' => [new DireccionResource($this->direccion()->first())],
            'luminaria' => new LuminariaResource($this->luminaria),
            'lampara' => new LamparaResource($this->lampara),
            'tipo_falla' => $this->IDTipoFalla,
            'falla' => $this->ticketTipoFalla->descripcion,
            'tipo_reparacion' => $this->IDTipoReparacion,
            'reparacion' => $this->IDTipoReparacion ? $this->ticketTipoReparacion->descripcion : null,
            'descripcion' => $this->descripcion,
            'usuario' => $this->usuario->nombre,
            'fecha' => Carbon::parse($this->created_at)->format('d/m/y H:i'),
            'fecha_cierre' => $this->fecha_cierre ? Carbon::parse($this->fecha_cierre)->format('d/m/y H:i') : null,
            'observaciones' => $this->observaciones,
            'estado' => $estado,

            'foto' => $this->IDFoto ? $host .'/api/foto/'. $this->foto->hash : null,
            'foto_previa' => $this->IDFoto_previa ? $host .'/api/foto/'. $this->fotoPrevia->hash : null,
        ];
    }
}
