<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'tickets';
    protected $primaryKey = 'IDTicket';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'IDUsuario',
        'IDDireccion',
        'IDLuminaria',
        'IDLampara',
        'IDTipoFalla',
        'descripcion',
        'observaciones',
        'estado',
        // Campos relacionados con el cierre o fotos que usualmente no se llenan al crear
        // 'IDUsuario_cierre',
        // 'IDTipoReparacion',
        // 'IDFoto',
        // 'IDFoto_previa',
        // 'fecha_cierre',
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
