<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TicketTipoFalla extends Model
{

    use SoftDeletes;

    protected $table      = 'tickets_tipos_fallas';
    protected $primaryKey = 'IDTipoFalla';

    public function getLabelAttribute()
    {
        return $this->potencia;
    }

    public function getValueAttribute()
    {
        return $this->IDPotencia;
    }
}
