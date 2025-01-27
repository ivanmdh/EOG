<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Luminaria extends Model
{

    use SoftDeletes;

    protected $table      = 'luminarias';
    protected $primaryKey = 'IDLuminaria';

}
