<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('direcciones', function (Blueprint $table) {
            $table->bigIncrements('IDDireccion');

            $table->string('num_cuenta', 100);
            $table->string('rpu', 100);
            $table->string('nombre', 250);
            $table->string('direccion', 250);
            $table->string('colonia', 250);
            $table->string('tarifa', 2);
            $table->integer('hilos');
            $table->double('carga_instalada', 20, 6);
            $table->double('demanda_cont', 20, 6);
            $table->integer('tipo_sum');
            $table->double('promedio_diario', 20, 6);
            $table->string('num_medidor', 10);
            $table->integer('anio');
            $table->date('fecha_censo');
            $table->integer('num_lamparas');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('direcciones');
    }
};
