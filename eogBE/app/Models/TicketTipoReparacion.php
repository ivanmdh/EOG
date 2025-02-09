<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TicketTipoReparacion extends Model
{

    use SoftDeletes;

    protected $table      = 'tickets_tipos_reparaciones';
    protected $primaryKey = 'IDTipoReparacion';

    public function getLabelAttribute()
    {
        return $this->descripcion;
    }

    public function getValueAttribute()
    {
        return $this->IDTipoReparacion;
    }
}
