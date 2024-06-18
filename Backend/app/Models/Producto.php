<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'descripcion', 'categoria_id', 'precio', 'garantia' , 'stock', 'image1','image2','image3'];
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
