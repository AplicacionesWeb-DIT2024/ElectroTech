<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FacturaDetail;

class Factura extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'precio_total',
        'estado',
        'mp_preference_id',
        'mp_payment_id',
        'fecha'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detalles()
    {
        return $this->hasMany(FacturaDetail::class);
    }
}
