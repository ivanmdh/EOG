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
            'folio' => 'LC'.str_pad($this->IDLuminaria, 5, "0", STR_PAD_LEFT),
            'fecha_alta' => Carbon::parse($this->fecha_alta)->format('d/m/Y'),

            'created_at' => $this->created_at,
        ];
    }
}
