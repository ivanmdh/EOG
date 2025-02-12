<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DireccionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'IDDireccion' => $this->IDDireccion,
            'nombre' => $this->nombre,
            'direccion' => $this->direccion,

            'value' => $this->IDDireccion,
            'label' => $this->direccion . ' - RPU: ' . $this->rpu,
        ];
    }
}
