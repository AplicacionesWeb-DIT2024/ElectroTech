<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\VentasController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\MercadoPagoWebhookController;
use App\Http\Controllers\Api\ValoracionController;
use App\Http\Controllers\Api\NewsController;


Route::post('/register',[AuthController::class, 'register']);

Route::get('/productos', [ProductController::class, 'index']);
Route::get('/productosDestacados', [ProductController::class, 'featuredProducts']);
Route::get('/productos/{id}', [ProductController::class, 'productById']);
Route::get('/buscar', [ProductController::class, 'busqueda']);
Route::get('/search/products', [ProductController::class, 'products']);
Route::get('/search/filters', [ProductController::class, 'filters']);


Route::get('/categorias', [CategoryController::class, 'index']);
Route::get('/categorias/{slug}/productos-marcas', [CategoryController::class, 'productosYMarcasPorCategoria']);
Route::get('/categorias/{slug}/productos', [CategoryController::class, 'productos']);
Route::get('/categorias/{slug}/marcas', [CategoryController::class, 'marcas']);

Route::get('news', [NewsController::class, 'index']); 


Route::get('productos2', [ProductController::class, 'index'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login',[AuthController::class, 'login']);

Route::post('/mercadopago/webhook', [MercadoPagoWebhookController::class, 'handle']);
Route::post('/payment/confirm', [MercadoPagoWebhookController::class, 'confirmFromFrontend']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/comprar',[VentasController::class, 'createVenta']);
    Route::get('/compras',[VentasController::class, 'index']);
    Route::post('/checkout',[PaymentController::class, 'create']);
    Route::get('/reviews/pending',[ValoracionController::class, 'valoracionesPendientes']);
    Route::post('/reviews',[ValoracionController::class, 'valorar']);
});