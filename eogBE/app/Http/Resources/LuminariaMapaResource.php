<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LuminariaMapaResource extends JsonResource
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
            'ubicacion' => [
                'latitud' => floatval($this->latitud),
                'longitud' => floatval($this->longitud),
            ],
            'data' => [
                'folio' => 'PC' . str_pad($this->IDLuminaria, 5, '0', STR_PAD_LEFT),
                'num_cuenta' => $this->num_cuenta,
                'rpu' => $this->direccion->rpu,
                'direccion' => $this->direccion->direccion,
                'colonia' => $this->direccion->colonia,
                'tarifa' => $this->direccion->tarifa,

                'lamparas' => LamparaResource::collection($this->lamparas),
            ],
        ];
    }
}
