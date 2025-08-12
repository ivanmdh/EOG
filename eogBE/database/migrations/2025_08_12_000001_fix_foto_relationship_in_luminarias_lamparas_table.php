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
        Schema::table('luminarias_lamparas', function (Blueprint $table) {
            // Agregar índices para mejorar performance en las consultas de fotos
            $table->index(['IDFoto']);
            $table->index(['IDFoto_secundaria']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('luminarias_lamparas', function (Blueprint $table) {
            $table->dropIndex(['IDFoto']);
            $table->dropIndex(['IDFoto_secundaria']);
        });
    }
};
