<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TicketRequest extends FormRequest
{

    public function prepareForValidation(): void
    {
        $this->merge([
            'IDUsuario' => $this->user()->IDUsuario,
            'IDDireccion' => $this->direccion[0]['IDDireccion'],
            'IDLuminaria' => $this->luminaria['IDLuminaria'],
            'IDLampara' => intval($this->lampara),
            'IDTipoFalla' => intval($this->tipo_falla),
            'descripcion' => mb_strtoupper($this->descripcion, 'UTF-8'),
            'estado' => 1,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'IDUsuario' => 'required',
            'IDDireccion' => 'required|exists:direcciones,IDDireccion',
            'IDLuminaria' => 'required|exists:luminarias,IDLuminaria',
            'IDLampara' => 'required|exists:luminarias_lamparas,IDLampara',
            'IDTipoFalla' => 'required|exists:tickets_tipos_fallas,IDTipoFalla',
            'descripcion' => 'required|string|max:100',
            'estado' => 'required|integer',
        ];
    }
}
