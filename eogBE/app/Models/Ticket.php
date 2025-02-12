<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{

    use SoftDeletes;

    protected $table      = 'tickets';
    protected $primaryKey = 'IDTicket';

    protected $fillable = [
        'luminaria',
    ];

    public function luminaria()
    {
        return $this->hasOne(Luminaria::class, 'IDLuminaria', 'IDLuminaria');
    }

    public function direccion()
    {
        return $this->hasOne(Direccion::class, 'IDDireccion', 'IDDireccion');
    }

    public function lampara()
    {
        return $this->hasOne(LuminariaLampara::class, 'IDLampara', 'IDLampara');
    }

    public function usuario()
    {
        return $this->hasOne(Usuario::class, 'IDUsuario', 'IDUsuario');
    }

    public function ticketTipoFalla()
    {
        return $this->hasOne(TicketTipoFalla::class, 'IDTipoFalla', 'IDTipoFalla');
    }

    public function ticketTipoReparacion()
    {
        return $this->hasOne(TicketTipoReparacion::class, 'IDTipoReparacion', 'IDTipoReparacion');
    }

    public function foto()
    {
        return $this->hasOne(LuminariaFoto::class, 'IDFoto', 'IDFoto');
    }

    public function fotoPrevia()
    {
        return $this->hasOne(LuminariaFoto::class, 'IDFoto', 'IDFoto_previa');
    }

}
