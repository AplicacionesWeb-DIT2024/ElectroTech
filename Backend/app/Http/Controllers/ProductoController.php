<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;


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
            'image1'=>'required|image'
        ]);
        $producto = Producto::create($request->all());

        if($request->hasFile('image1')){
            $nombre = $producto->id.'_1.'.$request->file('image1')->getClientOriginalExtension();
            $img = $request->file('image1')->storeAs('public/img',$nombre);
            $producto->image1 = '/img/'.$nombre;
            $producto->save();
        }
        if($request->hasFile('image2')){
            $nombre = $producto->id.'_2.'.$request->file('image2')->getClientOriginalExtension();
            $img = $request->file('image2')->storeAs('public/img',$nombre);
            $producto->image2 = '/img/'.$nombre;
            $producto->save();
        }
        if($request->hasFile('image3')){
            $nombre = $producto->id.'_3.'.$request->file('image3')->getClientOriginalExtension();
            $img = $request->file('image3')->storeAs('public/img',$nombre);
            $producto->image3 = '/img/'.$nombre;
            $producto->save();
        }

        return redirect()->route('productos.index')->with('success','Producto creado con exito'); 
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
            Storage::disk('public')->delete($producto->image1);
            $nombre = $producto->id.'_1.'.$request->file('image1')->getClientOriginalExtension();
            $img = $request->file('image1')->storeAs('public/img',$nombre);
            $producto->image1 = '/img/'.$nombre;
            $producto->save();
        }
        if($request->hasFile('image2')){
            Storage::disk('public')->delete($producto->image2);
            $nombre = $producto->id.'_2.'.$request->file('image2')->getClientOriginalExtension();
            $img = $request->file('image2')->storeAs('public/img',$nombre);
            $producto->image2 = '/img/'.$nombre;
            $producto->save();
        }
        if($request->hasFile('image3')){
            Storage::disk('public')->delete($producto->image3);
            $nombre = $producto->id.'_3.'.$request->file('image3')->getClientOriginalExtension();
            $img = $request->file('image3')->storeAs('public/img',$nombre);
            $producto->image3 = '/img/'.$nombre;
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
        Storage::disk('public')->delete($producto->image1);
        
        if (! is_null($producto->image2)){
            Storage::disk('public')->delete($producto->image2);
        }
        if (! is_null($producto->image3)){
            Storage::disk('public')->delete($producto->image3);
        }
        $producto->delete();
        return redirect()->route('productos.index')->with('success','Producto eliminado');

    }
}
