<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Orden;
use App\Models\Factura;
use App\Models\Producto;
use App\Models\FacturaItem;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;
use DB;

class MercadoPagoWebhookController extends Controller
{
public function handle(Request $request)
{
    // 1) Obtener payment id (puede NO venir en el simulador)
    $paymentId = $request->input("data.id");

    // Siempre responder 200 para que MP no haga timeout
    if (!$paymentId) {
        return response()->json(["status" => "ok"], 200);
    }

    // 2) Obtener pago real desde MercadoPago
    try {
        MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));
        $client = new PaymentClient();
        $payment = $client->get($paymentId);
    } catch (\Throwable $e) {
        return response()->json(["status" => "ok"], 200);
    }

    // 3) Extraer datos relevantes
    $externalRef = $payment->external_reference;
    $status = $payment->status;

    if (!$externalRef) {
        return response()->json(["status" => "ok"], 200);
    }

    // 4) Obtener orden
    $orden = Orden::find($externalRef);
    if (!$orden) {
        return response()->json(["status" => "ok"], 200);
    }

    // 5) Si está aprobado, procesar
    if ($status === "approved" && $orden->status !== "paid") {

        DB::transaction(function () use ($orden, $payment) {

            // Marcar orden pagada
            $orden->update([
                "status" => "paid",
                "mp_payment_id" => $payment->id,
                "mp_order_id"  => $payment->order->id ?? null,
            ]);

            // Crear factura
            $factura = Factura::create([
                "user_id" => $orden->user_id,
                "fecha" => now(),
                "precio_total" => $orden->total,
                "estado" => "pagado"
            ]);

            // Crear factura items
            foreach ($orden->items as $i) {

                $producto = Producto::find($i->producto_id);

                if ($producto->stock < $i->cantidad) {
                    // Si el stock no es suficiente, lanzamos un error o hacemos alguna acción
                    throw new \Exception("No hay suficiente stock para el producto: " . $producto->nombre);
                }

                $factura->detalles()->create([
                    "producto_id" => $i->producto_id,
                    "cantidad" => $i->cantidad,
                    "precio_unitario" => $i->precio_unitario,
                    "subtotal" => $i->precio_unitario * $i->cantidad
                ]);

                $producto->stock -= $i->cantidad;
                $producto->save();
            }
        });
    }

    return response()->json(["status" => "ok"], 200);
}

public function confirmFromFrontend(Request $request)
{
    \Log::info("Llego aqui");
    $paymentId = $request->payment_id;
    if (!$paymentId) {
        return response()->json(['error' => 'Missing payment_id'], 400);
    }

    MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));
    $client = new PaymentClient();

    // Obtener el pago real desde MercadoPago
    $payment = $client->get($paymentId);
    \Log::info("Payment obtenido", [$payment]);

    // Validar que esté realmente aprobado
    if ($payment->status !== "approved") {
        return response()->json(['error' => 'Payment not approved'], 400);
    }

    $orden = Orden::find($payment->external_reference);
    if (!$orden) {
        return response()->json(['error' => 'Order not found'], 404);
    }

    if ($orden->status !== "paid") {
        DB::transaction(function () use ($orden, $payment) {
            // Actualizamos el estado de la orden y asociamos el pago
            $orden->update([
                "status" => "paid",
                "mp_payment_id" => $payment->id,
                "mp_order_id" => $payment->order->id
            ]);

            // Creamos la factura
            $factura = Factura::create([
                "user_id" => $orden->user_id,
                "fecha" => now(),
                "precio_total" => $orden->total,
                "estado" => "pagado"
            ]);

            // Iteramos sobre los productos de la orden
            foreach ($orden->items as $i) {
                // Verificamos si el stock es suficiente
                $producto = Producto::find($i->producto_id);

                if ($producto->stock < $i->cantidad) {
                    // Si el stock no es suficiente, lanzamos un error o hacemos alguna acción
                    throw new \Exception("No hay suficiente stock para el producto: " . $producto->nombre);
                }

                // Creamos los detalles de la factura
                $factura->detalles()->create([
                    "producto_id" => $i->producto_id,
                    "cantidad" => $i->cantidad,
                    "precio_unitario" => $i->precio_unitario,
                    "subtotal" => $i->precio_unitario * $i->cantidad
                ]);

                // Descontamos el stock del producto
                $producto->stock -= $i->cantidad;
                $producto->save();
            }
        });
    }

    return response()->json(["status" => "processed"]);
}
}