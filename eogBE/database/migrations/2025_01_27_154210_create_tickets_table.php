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
        Schema::create('tickets', function (Blueprint $table) {
            $table->bigIncrements('IDTicket');

            $table->foreignId('IDUsuario')->nullable()->constrained('usuarios', 'IDUsuario')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDUsuario_cierre')->nullable()->constrained('usuarios', 'IDUsuario')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDDireccion')->nullable()->constrained('direcciones', 'IDDireccion')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDLuminaria')->nullable()->constrained('luminarias', 'IDLuminaria')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDLampara')->nullable()->constrained('luminarias_lamparas', 'IDLampara')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDTipoFalla')->nullable()->constrained('tickets_tipos_fallas', 'IDTipoFalla')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDTipoReparacion')->nullable()->constrained('tickets_tipos_reparaciones', 'IDTipoReparacion')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDFoto')->nullable()->constrained('luminarias_fotos', 'IDFoto')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDFoto_previa')->nullable()->constrained('luminarias_fotos', 'IDFoto')->onUpdate('cascade')->nullOnDelete();
            $table->string('descripcion', 250);
            $table->tinyText('observaciones')->nullable();
            $table->integer('estado');
            $table->dateTime('fecha_cierre')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
