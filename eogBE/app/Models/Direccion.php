<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{

    protected $table      = 'direcciones';
    protected $primaryKey = 'IDDireccion';

    public function getLabelAttribute()
    {
        return $this->nombre;
    }

    public function getValueAttribute()
    {
        return $this->IDDireccion;
    }

}
