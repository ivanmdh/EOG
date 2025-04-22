<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Luminaria extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'luminarias';
    protected $primaryKey = 'IDLuminaria';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'IDUsuario',
        'IDDireccion',
        'ampliacion',
        'latitud',
        'longitud',
    ];

    public function direccion()
    {
        return $this->belongsTo(Direccion::class, 'IDDireccion', 'IDDireccion');
    }

    public function lamparas()
    {
        return $this->hasMany(LuminariaLampara::class, 'IDLuminaria', 'IDLuminaria');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'IDUsuario', 'IDUsuario');
    }
}
