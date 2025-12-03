<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrdenItem;

class Orden extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'total',
        'status',
        'mp_payment_id',
        'mp_order_id',
    ];
    public function items()
    {
        return $this->hasMany(OrdenItem::class);
    }
}
