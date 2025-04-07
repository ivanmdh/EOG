<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LuminariaRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
         return [
            'ubicacion' => 'required|array',
            'ubicacion.latitud' => 'required|numeric',
            'ubicacion.longitud' => 'required|numeric',
            'direccion' => 'required|array',
            'direccion.*.IDDireccion' => 'required|integer|exists:direcciones',
            'luminarias' => 'required|array',
            'luminarias.*.potencia' => 'required|string',
            'luminarias.*.foto' => 'required|string',
            'luminarias.*.foto_secundaria' => 'nullable|string',
        ];
    }
}
