<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class NewsController extends Controller
{
    public function index(): View
    {
        $news = News::latest()->paginate(5);
        return view('News.index', ['news' => $news]);
    }

    public function create()
    {
        return view('News.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        News::create($request->all());  // Crear la novedad en la base de datos

        return redirect()->route('news.index')->with('success', 'Novedad creada con éxito.');
    }

    public function edit(News $news)
    {
        return view('News.edit', compact('news'));
    }

    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $news->update($request->all());  // Actualizar la novedad

        return redirect()->route('News.index')->with('success', 'Novedad actualizada con éxito.');
    }

    public function destroy(News $news)
    {
        $news->delete();  // Eliminar la novedad

        return redirect()->route('News.index')->with('success', 'Novedad eliminada con éxito.');
    }
}
