<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller
{
    // Método para obtener todas las novedades
    public function index()
    {
        $news = News::all();  // Obtener todas las novedades de la base de datos

        return response()->json($news);  // Devolver las novedades en formato JSON
    }
}
