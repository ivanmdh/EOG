<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rol extends Model
{

    use SoftDeletes;

    protected $table      = 'roles';
    protected $primaryKey = 'IDRol';

    public function getLabelAttribute()
    {
        return $this->nombre;
    }

    public function getValueAttribute()
    {
        return $this->IDRol;
    }

    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'IDRol', 'IDRol');
    }

}
