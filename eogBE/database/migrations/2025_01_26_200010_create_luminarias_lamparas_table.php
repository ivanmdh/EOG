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
        Schema::create('luminarias_lamparas', function (Blueprint $table) {
            $table->bigIncrements('IDLampara');
            $table->foreignId('IDLuminaria')->nullable()->constrained('luminarias', 'IDLuminaria')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDPotencia')->nullable()->constrained('luminarias_potencias', 'IDPotencia')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('IDFoto')->nullable()->constrained('luminarias_fotos', 'IDFoto')->onUpdate('cascade')->nullOnDelete();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('luminarias_lamparas');
    }
};
