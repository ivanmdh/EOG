<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LuminariaLampara extends Model
{

    use SoftDeletes;

    protected $table      = 'luminarias_lamparas';
    protected $primaryKey = 'IDLampara';

    public function foto()
    {
        return $this->hasOne(LuminariaFoto::class, 'IDFoto', 'IDFoto');
    }

    public function foto_secundaria()
    {
        return $this->hasOne(LuminariaFoto::class, 'IDFoto', 'IDFoto_secundaria');
    }

    public function potencia()
    {
        return $this->hasOne(LuminariaPotencia::class, 'IDPotencia', 'IDPotencia');
    }

}
