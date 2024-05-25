@extends('layouts.layout')
@section('title')
    Listado categorias
@endsection

@section('body')
<div class="row">
    <div class="col-12">
        <div>
            <h2 class="text-black">Listado de Categorias</h2>
        </div>
        <div>
            <a href="{{route('categorias.create')}}" class="btn btn-primary">Crear categoria</a>
        </div>
    </div>

    @if (Session::get('success'))
        <div class="alert alert-success mt-2">
            <strong>{{Session::get('success')}}<br>
        </div>
    @endif


    <div class="col-12 mt-4">
        <table class="table table-bordered">
            <tr class="text-secondary">
                <th>Nombre</th>
                <th>Descripción</th>
                <th></th>
            </tr>
            @foreach ($categorias as $categoria)
            <tr>
                <td class="fw-bold">{{$categoria->nombre}} </td>
                <td>{{$categoria->descripcion}}</td> 
                <td>
                    <a href="{{ route('categorias.edit', $categoria) }}" class="btn btn-warning">Editar</a>

                    <form action="{{ route('categorias.destroy', $categoria) }}" method="post" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Eliminar</button>
                    </form>
                </td>
            </tr> 
            @endforeach

        </table>
        {{$categorias->links()}}
    </div>
</div>
@endsection