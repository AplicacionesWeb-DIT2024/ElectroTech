<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;
use App\Models\Orden;
use App\Models\OrdenItem;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function create(Request $request)
    {
        // 1. Validar usuario autenticado
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        // 2. Crear orden en estado pending
        $total = collect($request->items)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });

        $orden = Orden::create([
            'user_id' => $user->id,
            'total'   => $total,
            'status'  => 'pending'
        ]);

        // 3. Guardar items
        foreach ($request->items as $item) {
            OrdenItem::create([
                'orden_id' => $orden->id,
                'producto_id' => $item['id'],     // ← asegurate de enviar el product ID
                'cantidad' => $item['quantity'],
                'precio_unitario' => $item['price']
            ]);
        }

        // 4. Crear preferencia MP
        MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));
        MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);

        $client = new PreferenceClient();

        $mpItems = collect($request->items)->map(function ($item) {
            return [
                'title' => $item['title'],
                'quantity' => $item['quantity'],
                'unit_price' => (float)$item['price'],
                'currency_id' => 'ARS',
            ];
        })->toArray();

        $preference = $client->create([
            'items' => $mpItems,
            'external_reference' => (string)$orden->id, // ⭐ IMPORTANTE
            'back_urls' => [
                'success' => 'https://localhost:3000/success',
                'failure' => 'https://localhost:3000/failure',
                'pending' => 'https://localhost:3000/pending',
            ],
            'auto_return' => 'approved'
        ]);

        return response()->json([
            'init_point' => $preference->init_point,
            'id' => $preference->id,
        ]);
    }
}
