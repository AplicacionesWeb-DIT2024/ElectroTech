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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion');
            $table->foreignId('categoria_id')->constrained('categorias')->nullOnDelete()->cascadeOnUpdate();
            $table->integer('precio');
            $table->integer('garantia');
            $table->integer('stock')->default('1');
            $table->string('image1',80);
            $table->string('image2',80)->nullable();
            $table->string('image3',80)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
