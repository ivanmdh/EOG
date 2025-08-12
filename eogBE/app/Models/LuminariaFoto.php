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
        'nombre_archivo',
        'ruta_archivo',
        'tipo_mime',
        'tamano_archivo',
        'ancho',
        'alto',
        'hash',
        'fecha_subida'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'fecha_subida' => 'datetime',
        'tamano_archivo' => 'integer',
        'ancho' => 'integer',
        'alto' => 'integer',
    ];

    /**
     * Relación con lámparas que usan esta foto como principal
     */
    public function lamparasPrincipales()
    {
        return $this->hasMany(LuminariaLampara::class, 'IDFoto', 'IDFoto');
    }

    /**
     * Relación con lámparas que usan esta foto como secundaria
     */
    public function lamparasSecundarias()
    {
        return $this->hasMany(LuminariaLampara::class, 'IDFoto_secundaria', 'IDFoto');
    }

    /**
     * Relación con tickets que usan esta foto
     */
    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'IDFoto', 'IDFoto');
    }

    /**
     * Relación con tickets que usan esta foto como previa
     */
    public function ticketsPrevios()
    {
        return $this->hasMany(Ticket::class, 'IDFoto_previa', 'IDFoto');
    }

}
