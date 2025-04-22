<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LuminariaLampara extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'luminarias_lamparas';
    protected $primaryKey = 'IDLampara';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'IDLuminaria',
        'IDPotencia',
        'IDFoto',
        'IDFoto_secundaria',
        'numero_serie',
    ];

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
