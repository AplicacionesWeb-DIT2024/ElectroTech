<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NewsController;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

Route::get('welcome', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {
    Route::view('home', 'home')->name('home');
    Route::resource('categorias', CategoriaController::class);
    Route::resource('productos', ProductoController::class);
    Route::resource('news', NewsController::class);
    Route::get('logout',[LoginController::class, 'logout'])->name('logout');
    Route::get('logout',[LoginController::class, 'logout'])->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::view('/', 'login')->name('login');
    Route::post('inicio-sesion',[LoginController::class, 'login'])->name('inicio-sesion');
});



Route::get('/test-cloudinary', function () {
    try {
        // Subimos un archivo temporal muy pequeño
        $tempFile = tmpfile();
        $meta = stream_get_meta_data($tempFile);
        $tmpFilePath = $meta['uri'];

        file_put_contents($tmpFilePath, 'test'); // contenido mínimo

        $uploadedFile = Cloudinary::upload($tmpFilePath, ['folder' => 'test']);

        // Obtenemos URL segura
        $url = $uploadedFile->getSecurePath();

        fclose($tempFile); // cerramos el temp file
        return response()->json([
            'success' => true,
            'url' => $url
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
});
