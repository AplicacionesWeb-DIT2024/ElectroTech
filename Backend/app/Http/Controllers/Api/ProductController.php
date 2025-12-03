<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;

class ProductController extends Controller
{
    public function index(){
        $productos = Producto::where('stock', '>', 0)->get();
        return response()->json($productos, 200);
    }

    public function featuredProducts(){
        $productos = Producto::where('stock', '>', 0)
                        ->where('featured', true)
                        ->with('categoria')
                        ->get();
        return response()->json($productos, 200);
    }

    public function productById($id){
        $producto = Producto::with([
            'valoraciones',
            'valoraciones.user:id,name'
        ])->withAvg('valoraciones as average_rating', 'puntuacion')
        ->find($id);

        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto, 200);
    }
}
