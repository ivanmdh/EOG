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
            'lat' => $this->latitud,
            'lng' => $this->longitud,
            'data' => [
                'title' => 'Luminaria',
                'image' => 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                'medidor' => 'Medidor',
            ],
        ];
    }
}
