<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LuminariaPotencia extends Model
{

    protected $table      = 'luminarias_potencias';
    protected $primaryKey = 'IDPotencia';

    public function getLabelAttribute()
    {
        return $this->potencia;
    }

    public function getValueAttribute()
    {
        return $this->IDPotencia;
    }
}
