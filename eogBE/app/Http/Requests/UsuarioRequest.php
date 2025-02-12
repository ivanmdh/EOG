<?php

namespace App\Http\Requests;

use App\Models\Usuario;
use Illuminate\Foundation\Http\FormRequest;

class UsuarioRequest extends FormRequest
{

    public function prepareForValidation(): void
    {
        $this->merge(array_merge($this->all(), [
            'IDRol' => $this->rol,
            'nombre' => mb_strtoupper($this->nombre, 'UTF-8'),
            'apellido' => mb_strtoupper($this->apellido, 'UTF-8'),
        ]));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'IDUsuario' => 'integer|exists:usuarios|nullable',
            'IDRol' => 'integer|exists:roles|nullable',

            'nombre' => 'required|string',
            'apellido' => 'string',
            'email' => 'required|email',
            'usuario' => 'required|string|unique:usuarios,usuario,NULL,NULL,deleted_at,NULL',
            'password' => 'string|nullable',
        ];
    }
}
