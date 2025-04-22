<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LuminariaFoto extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'luminarias_fotos';
    protected $primaryKey = 'IDFoto';

    protected $fillable = [
        'foto'
    ];

}
