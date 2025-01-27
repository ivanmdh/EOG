<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Luminaria extends Model
{
    public function luminarias_lamparas()
    {
        return $this->belongsToMany(LuminariaPotencia::class, 'luminarias_potencias_relacion', 'IDLuminaria', 'IDLuminaria');
    }
}
