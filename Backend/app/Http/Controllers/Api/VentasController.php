<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Factura;
use App\Models\FacturaDetail;

class VentasController extends Controller
{
    /* TODO ESTO TODAVIA NO ESTA CHEQUEADO */
    public function createVenta(Request $request){
        $user =  auth('sanctum')->user();
        /* $user = $request->user(); */
        $cabecera = $request->cabecera;
        $factura = Factura::create([
            'user_id' => $user->id,
            'fecha' => $cabecera->fecha,
            'precio_total' => $cabecera->precio_total
        ]);
        $productos = $request->productos;
        foreach($productos as $producto){
        $detalle = DetalleFactura::create([
            'factura_id' => $factura->id,
            'producto_id' => $producto->id,
            'cantidad' => $producto->cantidad,
            'precio_unitario' =>1
        ]);
        }
    }
}
