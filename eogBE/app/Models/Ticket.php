<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{

    use SoftDeletes;

    protected $table      = 'tickets';
    protected $primaryKey = 'IDTicket';

    protected $fillable = [
        'luminaria',
    ];

    public function luminaria()
    {
        return $this->hasOne(Luminaria::class, 'IDLuminaria', 'IDLuminaria');
    }

    public function direccion()
    {
        return $this->hasOne(Direccion::class, 'IDDireccion', 'IDDireccion');
    }
}
