<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Valoracion;
use Laravel\Scout\Searchable;

class Producto extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['nombre', 'descripcion','marca', 'categoria_id', 'precio', 'garantia' , 'stock','featured' ,'image1','image2','image3'];

    protected $appends = ['images'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function getImagesAttribute()
    {
        return array_values(array_filter([
            $this->image1,
            $this->image2,
            $this->image3,
        ]));
    }
    public function valoraciones()
    {
        return $this->hasMany(Valoracion::class);
    }

    public function promedioValoraciones()
    {
        return $this->valoraciones()->avg('puntuacion');
    }

    public function toSearchableArray(): array
    {
        return [
            'nombre'      => $this->nombre,
            'descripcion' => $this->descripcion,
            'marca'       => $this->marca,
        ];
    }
}
