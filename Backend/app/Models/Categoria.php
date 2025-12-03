<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use Illuminate\Support\Str;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'slug','descripcion'];
    protected $appends = ['image']; 

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    protected static function booted()
    {
        static::creating(function ($categoria) {
            $categoria->slug = Str::slug($categoria->nombre);
        });

        static::updating(function ($categoria) {
            $categoria->slug = Str::slug($categoria->nombre);
        });
    }
    public function getImageAttribute()
    {
        $producto = $this->productos()
            ->where('stock', '>', 0)
            ->whereNotNull('image1')
            ->first();

        return $producto ? $producto->image1 : null;
    }
}

