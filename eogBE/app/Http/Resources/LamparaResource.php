<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LamparaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'IDLampara' => $this->IDLampara,
            'folio' => 'LC'.str_pad($this->IDLampara, 5, "0", STR_PAD_LEFT),
            'indice' => $this->IDLampara,
            'potencia' => $this->IDPotencia,
            'foto' => $this->hash,
        ];
    }
}
