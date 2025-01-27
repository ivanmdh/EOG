<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LuminariaFoto extends Model
{

    use SoftDeletes;

    protected $table      = 'luminarias_fotos';
    protected $primaryKey = 'IDFoto';

    protected $fillable = [
        'foto'
    ];

}
