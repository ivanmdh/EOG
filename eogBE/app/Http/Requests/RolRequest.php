<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RolRequest extends FormRequest
{

    public function prepareForValidation(): void
    {
        $this->merge(array_merge($this->all(), [
            'nombre' => mb_strtoupper($this->nombre, 'UTF-8'),
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
            'IDRol' => 'integer|exists:roles|nullable',
            'nombre' => 'required|string',
        ];
    }
}
