<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LuminariaFoto extends Model
{

    protected $table      = 'luminarias_fotos';
    protected $primaryKey = 'IDFoto';

    protected $fillable = [
        'foto'
    ];

}
