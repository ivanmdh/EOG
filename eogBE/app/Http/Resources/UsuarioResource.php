<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'IDUsuario' => $this->IDUsuario,
            'IDRol' => $this->IDRol,

            'nombre' => $this->nombre,
            'apellido' => $this->apellido,
            'usuario' => $this->usuario,
            'email' => $this->email,
            'rol' => $this->IDRol,
            'rol_nombre' => $this->rol->nombre,
        ];
    }
}
