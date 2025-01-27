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
                'image' => 'https://cdn.bega.com/cdn-cgi/image/w=600,h=900,fit=cover,gravity=0.78x0.45,f=auto/https://images.ctfassets.net/w2xcep4i3dcd/1s70gOipU2vswLeqFPdmM6/28cc21e547e64faac91b06f1662a30a5/BE84252_HERO_3.jpg',
                'num_cuenta' => $this->direccion->num_cuenta,
                'rpu' => $this->direccion->rpu,
                'tarifa' => $this->direccion->tarifa,
                'hilos' => $this->direccion->hilos,
                'num_medidor' => $this->direccion->num_medidor,
            ],
        ];
    }
}
