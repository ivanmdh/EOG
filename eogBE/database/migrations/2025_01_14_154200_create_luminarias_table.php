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
        Schema::create('luminarias', function (Blueprint $table) {
            $table->bigIncrements('IDLuminaria');
            $table->foreignId('IDUsuario')->nullable()->constrained('usuarios', 'IDUsuario')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDDireccion')->nullable()->constrained('direcciones', 'IDDireccion')->onUpdate('cascade')->nullOnDelete();

            $table->boolean('ampliacion')->default(false);
            $table->string('latitud', 100);
            $table->string('longitud', 100);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('luminarias');
    }
};
