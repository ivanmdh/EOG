<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LuminariaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'IDLuminaria' => $this->IDLuminaria,
            'folio' => 'PC'.str_pad($this->IDLuminaria, 5, "0", STR_PAD_LEFT),
            'fecha_alta' => Carbon::parse($this->created_at)->format('d/m/Y'),
            'usuario' => $this->usuario->nombre,

            'direccion' => [DireccionResource::make($this->direccion)],

            'luminarias' => LamparaResource::collection($this->lamparas),

            'ubicacion' => [
                'latitud' => floatval($this->latitud),
                'longitud' => floatval($this->longitud),
            ],

            'created_at' => $this->created_at,
        ];
    }
}
