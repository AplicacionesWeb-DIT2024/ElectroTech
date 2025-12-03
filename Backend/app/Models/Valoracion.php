<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use App\Models\User;
use App\Models\facturaDetail;

class Valoracion extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'producto_id',
        'factura_detail_id',
        'comentario',
        'puntuacion',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function facturaDetail()
    {
        return $this->belongsTo(FacturaDetail::class);
    }
}
