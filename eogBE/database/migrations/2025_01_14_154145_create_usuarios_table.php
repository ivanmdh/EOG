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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->bigIncrements('IDUsuario');
            $table->foreignId('IDRol')->nullable()->constrained('roles', 'IDRol')->onUpdate('cascade')->nullOnDelete();

            $table->string('nombre', 100);
            $table->string('apellido', 100);
            $table->string('email', 100);
            $table->string('usuario', 100)->unique();
            $table->string('password', 100);
            $table->string('password_reset', 100)->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
