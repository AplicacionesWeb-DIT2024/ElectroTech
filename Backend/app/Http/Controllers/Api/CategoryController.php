<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Producto;

class CategoryController extends Controller
{
    public function index()
    {
        $categorias = Categoria::whereHas('productos', function ($q) {
            $q->where('stock', '>', 0);
        })->get();

        return response()->json($categorias, 200);
    }

    public function productosPorSlug($slug)
    {
        $categoria = Categoria::where('slug', $slug)->first();

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $productos = $categoria->productos()->with('categoria')->where('stock', '>', 0) ->get();

        return response()->json($productos);
    }

    public function productosYMarcasPorCategoria(Request $request, $slug)
    {
        $categoria = Categoria::where('slug', $slug)->first();

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $query = $categoria->productos()
            ->with('categoria')
            ->where('stock', '>', 0);

        // 🔹 Filtro por marca
        if ($request->filled('marca')) {
            $query->where('marca', $request->marca);
        }

        // 🔹 Filtro por rango de precios
        if ($request->filled('precio_min')) {
            $query->where('precio', '>=', $request->precio_min);
        }
        if ($request->filled('precio_max')) {
            $query->where('precio', '<=', $request->precio_max);
        }

        $productos = $query->get();

        // 🔹 Obtener marcas (solo de productos con stock)
        $marcas = $categoria->productos()
            ->where('stock', '>', 0)
            ->whereNotNull('marca')
            ->distinct()
            ->pluck('marca');

        return response()->json([
            'productos' => $productos,
            'marcas' => $marcas,
        ]);

    }   
    public function marcas($slug)
    {
        $categoria = Categoria::where('slug', $slug)->firstOrFail();

        $marcas = Producto::where('categoria_id', $categoria->id)
            ->where('stock', '>', 0)
            ->distinct()
            ->pluck('marca'); // devuelve solo los nombres de marca únicos

        return response()->json($marcas, 200);
    }

    public function productos(Request $request, $slug)
    {
        $categoria = Categoria::where('slug', $slug)->firstOrFail();

        $query = Producto::where('categoria_id', $categoria->id)
            ->where('stock', '>', 0)->with('categoria'); // solo productos con stock

        // Filtro por marca
        if ($request->has('marca') && $request->marca) {
            $query->where('marca', $request->marca);
        }

        // Filtro por precio
        if ($request->has('precio_min')) {
            $query->where('precio', '>=', $request->precio_min);
        }
        if ($request->has('precio_max')) {
            $query->where('precio', '<=', $request->precio_max);
        }

        $productos = $query->paginate(9);

        return response()->json($productos, 200);
    }
}
