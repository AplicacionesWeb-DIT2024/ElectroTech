<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\LoginController;

Route::get('welcome', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {
    Route::view('home', 'home')->name('home');
    Route::resource('categorias', CategoriaController::class);
    Route::resource('productos', ProductoController::class);
    Route::get('logout',[LoginController::class, 'logout'])->name('logout');
    Route::get('logout',[LoginController::class, 'logout'])->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::view('/', 'login')->name('login');
    Route::post('inicio-sesion',[LoginController::class, 'login'])->name('inicio-sesion');
});




