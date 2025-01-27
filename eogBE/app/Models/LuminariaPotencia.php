<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LuminariaPotencia extends Model
{

    use SoftDeletes;

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
