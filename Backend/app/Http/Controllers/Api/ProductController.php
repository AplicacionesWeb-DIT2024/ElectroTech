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

    public function busqueda(Request $request)
    {
        $query = trim($request->input('q', ''));

        if ($query === '') {
            return response()->json([
                'data' => []
            ]);
        }

        $productos = Producto::search($query)
            ->query(function ($q) {
                $q->where('stock', '>', 0)
                ->with('categoria');
            })
            ->paginate(12);

        return response()->json($productos);
    }

    public function filters(Request $request)
    {
        $q = $request->query('q');

        if (!$q) {
            return response()->json([
                'brands' => [],
                'categories' => [],
                'price_min' => 0,
                'price_max' => 0,
            ]);
        }

        // IDs encontrados por Scout
        $ids = Producto::search($q)->keys();

        $query = Producto::query()
            ->whereIn('productos.id', $ids)
            ->where('productos.stock', '>', 0);

        return response()->json([
            'brands' => $query->clone()
                ->select('marca')
                ->distinct()
                ->orderBy('marca')
                ->pluck('marca'),

            'categories' => $query->clone()
                ->join('categorias', 'productos.categoria_id', '=', 'categorias.id')
                ->select(
                    'categorias.id',
                    'categorias.nombre',
                    'categorias.slug'
                )
                ->distinct()
                ->orderBy('categorias.nombre')
                ->get(),

            'price_min' => (float) $query->clone()->min('precio'),
            'price_max' => (float) $query->clone()->max('precio'),
        ]);
    }

    public function products(Request $request)
    {
        $q = $request->query('q');

        if (!$q) {
            return response()->json([
                'data' => [],
                'current_page' => 1,
                'last_page' => 1,
            ]);
        }

        // Scout → IDs relevantes
        $ids = Producto::search($q)->keys();

        $productos = Producto::query()
            ->with('categoria')
            ->whereIn('id', $ids)
            ->where('stock', '>', 0);

        // Filtro marca
        if ($request->filled('brand')) {
            $productos->where('marca', $request->brand);
        }

        if ($request->filled('category')) {
            $productos->where('productos.categoria_id', $request->category);
        }

        // Precio
        if ($request->filled('priceMin')) {
            $productos->where('precio', '>=', $request->priceMin);
        }

        if ($request->filled('priceMax')) {
            $productos->where('precio', '<=', $request->priceMax);
        }

        return response()->json(
            $productos->paginate(9)
        );
    }
}
