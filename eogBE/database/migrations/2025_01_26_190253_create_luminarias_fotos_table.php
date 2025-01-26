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
        Schema::create('luminarias_fotos', function (Blueprint $table) {
            $table->bigIncrements('IDFoto');
            $table->string('nombre_archivo', 255);
            $table->string('ruta_archivo', 255);
            $table->string('tipo_mime', 50);
            $table->unsignedBigInteger('tamano_archivo');
            $table->unsignedInteger('ancho');
            $table->unsignedInteger('alto');
            $table->string('hash', 64)->unique();
            $table->timestamp('fecha_subida')->useCurrent();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('luminarias_fotos');
    }
};
