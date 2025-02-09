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
        $host = config('app.url');
        $host = str_replace('http://', '', $host);
        $host = str_replace('https://', '', $host);
        if (app()->environment('local')) {
            $host = 'http://api.'.$host.':8000';
        } else {
            $host = 'https://api.'.$host;
        }
        return [
            'IDLampara' => $this->IDLampara,
            'IDPotencia' => $this->IDPotencia,
            'folio' => 'LC'.str_pad($this->IDLampara, 5, "0", STR_PAD_LEFT),
            'indice' => $this->IDLampara,
            'potencia' => $this->potencia->potencia,
            'foto' => $host.'/api/foto/'.$this->foto->hash,
        ];
    }
}
