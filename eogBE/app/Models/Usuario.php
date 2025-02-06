<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

    protected $table      = 'usuarios';
    protected $primaryKey = 'IDUsuario';

    public function rol()
    {
        return $this->hasOne(Rol::class, 'IDRol');
    }

}
