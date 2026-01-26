<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FacturaDetail;
use App\Models\Valoracion;

class ValoracionController extends Controller
{
    public function valorar(Request $request)
    {
        $request->validate([
            'factura_detail_id' => 'required|exists:factura_details,id',
            'puntuacion' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
        ]);


        $detail = FacturaDetail::with('factura')->findOrFail($request->factura_detail_id);

        // Validar que la compra pertenezca al usuario autenticado
        if ($detail->factura->user_id !== $request->user()->id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        // Evitar duplicados (gracias al UNIQUE de la DB)
        if ($detail->valoracion) {
            return response()->json(['error' => 'Ya valorado'], 409);
        }

        $valoracion = Valoracion::create([
            'user_id' => $request->user()->id,
            'producto_id' => $detail->producto_id,
            'factura_detail_id' => $detail->id,
            'puntuacion' => $request->puntuacion,
            'comentario' => $request->comentario,
        ]);

        return response()->json($valoracion);
    }

    public function valoracionesPendientes(){
        $detalles = FacturaDetail::whereHas('factura', function ($q) {
            $q->where('user_id', auth()->id());
        })
        ->whereDoesntHave('valoracion')
        ->with('producto')
        ->get();

        return response()->json($detalles);
    }

}
