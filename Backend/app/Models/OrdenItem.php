<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Orden;


class OrdenItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'orden_id',
        'producto_id',
        'cantidad',
        'precio_unitario'
    ];
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
