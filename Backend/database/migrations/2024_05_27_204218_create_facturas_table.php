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
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete()
                ->cascadeOnUpdate();

            $table->dateTime('fecha')->useCurrent();

            // total de la compra
            $table->integer('precio_total');

            // estado de la factura/pedido
            $table->enum('estado', ['pendiente', 'pagado', 'cancelado'])
                ->default('pendiente');

            // ID de MercadoPago o cadena de pago
            $table->string('mp_preference_id')->nullable();
            $table->string('mp_payment_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
