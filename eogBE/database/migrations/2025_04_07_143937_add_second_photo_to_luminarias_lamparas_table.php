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
            $table->unsignedBigInteger('IDFoto_secundaria')->nullable()->after('IDFoto');
            $table->foreign('IDFoto_secundaria')->references('IDFoto')->on('luminarias_fotos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('luminarias_lamparas', function (Blueprint $table) {
            $table->dropForeign(['IDFoto_secundaria']);
            $table->dropColumn('IDFoto_secundaria');
        });
    }
};
