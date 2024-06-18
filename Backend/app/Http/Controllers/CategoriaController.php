<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $categorias = Categoria::latest()->paginate(5);
        return view('Categorias.index', ['categorias' => $categorias]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('Categorias.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse 
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
        ]);
        Categoria::create($request->all());
        return redirect()->route('categorias.index')->with('success','Categoria creada con exito'); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria): View
    {
        return view('Categorias.edit',['categoria' => $categoria]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria): RedirectResponse 
    {
        $categoria->update($request->all());
        return redirect()->route('categorias.index')->with('success','Categoria actualizada con exito'); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    { 
        try {
            $categoria->delete();
        } catch (\Exception $e) {

            return redirect()->route('categorias.index')->with('error',"No es posible eliminar la categoria {$categoria->nombre}");
        }
        return redirect()->route('categorias.index')->with('success',"Categoria {$categoria->nombre} eliminada");
    }
}
