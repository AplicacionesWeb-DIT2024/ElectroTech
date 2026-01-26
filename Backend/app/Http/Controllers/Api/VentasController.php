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
                ], 422);
            }
            if($producto->stock < $value['cantidad']){
                return response()->json([
                    'mensaje' => "No hay stock suficiente del  producto con id {$producto->id}"
                ], 422);
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
            ], 422);
        }

        return response()->json([
            'cabecera' => $cabecera,
            'detalle' => $data
        ],201);
    }

    public function index(Request $request){
    // Obtener el usuario autenticado
    $user = auth('sanctum')->user();

    // Obtener las facturas con sus detalles (relación cargada)
    $facturas = Factura::with('detalles.producto') // Relación cargada
                        ->where('user_id', $user->id)
                        ->get();

    // Retornar la respuesta con los datos en formato JSON
    return response()->json($facturas, 200);
    }
}
