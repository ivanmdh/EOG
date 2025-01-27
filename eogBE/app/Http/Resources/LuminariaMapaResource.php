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
            'lat' => floatval($this->latitud),
            'lng' => floatval($this->longitud),
            'data' => [
                'title' => 'Luminaria LC' . str_pad($this->IDLuminaria, 5, '0', STR_PAD_LEFT),
                'image' => 'http://api.eog.local:8000/api/luminarias/mapa',
                'num_cuenta' => $this->direccion->num_cuenta,
                'rpu' => $this->direccion->rpu,
                'tarifa' => $this->direccion->tarifa,
                'hilos' => $this->direccion->hilos,
                'num_medidor' => $this->direccion->num_medidor,
            ],
        ];
    }
}
