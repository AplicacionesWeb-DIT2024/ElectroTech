<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Factura;
use App\Models\FacturaDetail;
use App\Models\Producto;

class VentasController extends Controller
{
    /* TODO ESTO TODAVIA NO ESTA CHEQUEADO */
    public function createVenta(Request $request){
        $user =  auth('sanctum')->user();
        $cabecera = $request->cabecera;
        $factura = Factura::create([
            'user_id' => $user->id,
            'fecha' => $cabecera['fecha'],
            'precio_total' => $cabecera['precio_total']
        ]);
        $data = [];
        $listProducts = [];
        $precioParcial = 0;
        $productos = $request->productos;
        foreach($productos as $key => $value){
            try{
                $producto = Producto::where('id', $value['id'])->firstOrFail();
            }catch (\Exception $e) {
                return response()->json([
                    'mensaje' => "No existe producto con id {$value['id']}"
                ]);
            }
            if($producto->stock < $value['cantidad']){
                return response()->json([
                    'mensaje' => "No hay stock suficiente del  producto con id {$producto->id}"
                ]);
            }else{
                array_push($data,[
                    'factura_id' => $factura->id,
                    'producto_id' => $value['id'],
                    'cantidad' => $value['cantidad'],
                    'precio_unitario' => $producto->precio
                ]);
                $producto->stock -= $value['cantidad'];
                array_push($listProducts,$producto);
            }
            $precioParcial += $producto->precio*$value['cantidad'];
        }
        if($cabecera['precio_total'] == $precioParcial){
            foreach($productos as $key => $value){
                collect($listProducts)->each(function ($item) {
                    $item->save();
                });
            }
            $detalles = FacturaDetail::insert($data);
        }else{
            $factura->delete();
            return response()->json([
                'mensaje' => 'El precio total no coincide'
            ]);
        }

        return response()->json([
            'cabecera' => $cabecera,
            'detalle' => $data
        ]);
    }

    public function index(Request $request){
        $user =  auth('sanctum')->user();
        $ventas = Factura::where('user_id', $user->id)->get();
        $facturas = [];
        foreach($ventas as $key => $venta){
            $detalles = FacturaDetail::where('factura_id', $venta->id)->get();
            array_push($facturas,[
                'cabecera' => $venta,
                'detalles' => $detalles,
            ]);
        }
        return response($facturas);
        return response()->json($ventas);
    }
}
