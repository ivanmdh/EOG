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
            $table->foreignId('IDLuminaria')->nullable()->constrained('luminarias', 'IDLuminaria')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDTipoFalla')->nullable()->constrained('tickets_tipos_fallas', 'IDTipoFalla')->onUpdate('cascade')->nullOnDelete();
            $table->string('asunto', 100);
            $table->string('descripcion', 100);
            $table->integer('estado');

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
