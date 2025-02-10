<?php

namespace App\Http\Requests;

use App\Models\LuminariaFoto;
use Illuminate\Foundation\Http\FormRequest;

class TicketCierreRequest extends FormRequest
{

    public function prepareForValidation(): void
    {
        $this->merge([
            'IDTicket' => $this->IDTicket,
            'IDUsuario_cierre' => $this->user()->IDUsuario,
            'IDFoto' => LuminariaFoto::where('hash', $this->foto)->first()->IDFoto,
            'IDTipoReparacion' => intval($this->tipo_reparacion),
            'observaciones' => mb_strtoupper($this->observaciones, 'UTF-8'),
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
            'IDTicket' => 'required|exists:tickets,IDTicket',
            'IDUsuario_cierre' => 'required',
            'IDFoto' => 'required|exists:luminarias_fotos,IDFoto',
            'IDTipoReparacion' => 'required|exists:tickets_tipos_reparaciones,IDTipoReparacion',
            'observaciones' => 'nullable|string',
        ];
    }
}
