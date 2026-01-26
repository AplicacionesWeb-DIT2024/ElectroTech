<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;


class ProductoController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $productos = Producto::latest()->paginate(5);
        return view('Productos.index', ['productos'=>$productos]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        $categorias = Categoria::pluck('nombre', 'id'); 
        return view('Productos.create', compact('categorias'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'categoria_id' => 'required',
            'precio' => 'required',
            'garantia' => 'required',
            'image1' => 'required|image',
            'image2' => 'nullable|image',
            'image3' => 'nullable|image',
        ]);

        $imageUrls = [];

        // Subir imágenes primero
        foreach (['image1', 'image2', 'image3'] as $field) {
            if ($request->hasFile($field)) {
                $imageUrls[$field] = $this->uploadToCloudinary($request->file($field));
            } else {
                $imageUrls[$field] = null;
            }
        }

        // Crear el producto con los URLs de las imágenes
        $producto = Producto::create(array_merge(
            $request->only([
                'nombre',
                'descripcion',
                'categoria_id',
                'precio',
                'garantia',
                'marca',
                'stock',
                'featured'
            ]),
            $imageUrls // asigna image1, image2, image3
        ));

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto creado con éxito');
    }


    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        $categorias = Categoria::pluck('nombre', 'id'); 
        return view('Productos.edit', compact('producto','categorias'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'categoria_id' => 'required',
            'precio' => 'required',
            'garantia' => 'required'
        ]);

        if($request->hasFile('image1')){
            $this->deleteFromCloudinary($producto->image1);
            $producto->image1 = $this->uploadToCloudinary($request->file('image1'));
            $producto->save();
        }
        if($request->hasFile('image2')){
            if (! is_null($producto->image2)){
                $this->deleteFromCloudinary($producto->image2);
            }
            $producto->image2 = $this->uploadToCloudinary($request->file('image2'));
            $producto->save();
        }
        if($request->hasFile('image3')){
            if (! is_null($producto->image3)){
                $this->deleteFromCloudinary($producto->image3);
            }
            $producto->image3 = $this->uploadToCloudinary($request->file($field));;
            $producto->save();
        }
        $producto->update($request->input());
        return redirect()->route('productos.index')->with('success','Producto modificado con exito');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        $images = [];
        array_push($images,$producto->image1);
        
        if (! is_null($producto->image2)){
            array_push($images,$producto->image2);
        }
        if (! is_null($producto->image3)){
            array_push($images,$producto->image3);
        }
        try {
            $producto->delete();
        } catch (\Exception $e) {
            return redirect()->route('productos.index')->with('error',"No es posible eliminar el producto {$producto->nombre} por estar referenciado");
        }

        foreach($images as $key => $value){
            $this->deleteFromCloudinary($value);
        }
        return redirect()->route('productos.index')->with('success','Producto eliminado');

    }

    /**
     * Subir un archivo a Cloudinary de manera segura.
    */
    
    private function uploadToCloudinary($file): string
    {
        $path = Storage::disk('cloudinary')->put('products', $file);
        return Storage::disk('cloudinary')->url($path);
    }
    private function deleteFromCloudinary($url): bool
    {
         // Extraemos el path de la URL
        $urlParts = parse_url($url);
        $path = $urlParts['path']; // Esto será algo como "/v1234567890/products/imagen.jpg"
        
        // El public_id es todo después de "/upload/"
        $pathParts = explode('/upload/', $path);
        
        $imageUrl = $pathParts[1] ?? '';
        // Extraemos el public_id de la URL
        $publicId = $this->getPublicIdFromUrl($imageUrl);
        
        // Elimina la imagen utilizando el disco de Cloudinary
        return Storage::disk('cloudinary')->delete($publicId);
    }

    private function getPublicIdFromUrl($url): string
    {
        // Suponiendo que la URL tiene el formato: 
        // https://res.cloudinary.com/tu_nombre_de_usuario/image/upload/v1234567890/products/imagen.jpg
        
        // Extraemos el path de la URL
        $urlParts = parse_url($url);
        $path = $urlParts['path']; // Esto será algo como "/v1234567890/products/imagen.jpg"
        
        // El public_id es todo después de "/upload/"
        $pathParts = explode('/upload/', $path);
        
        return $pathParts[1] ?? ''; // Retornamos el public_id
    }
}
