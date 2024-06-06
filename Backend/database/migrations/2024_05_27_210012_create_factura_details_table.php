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
        Schema::create('factura_details', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('factura_id')->constrained('facturas')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('producto_id')->constrained('productos')->nullOnDelete()->cascadeOnUpdate();
            $table->integer('cantidad');
            $table->integer('precio_unitario');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factura_details');
    }
};
