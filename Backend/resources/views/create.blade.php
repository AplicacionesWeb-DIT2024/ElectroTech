@extends('layouts.base')

@section('content')
<div class="row">
    <div class="col-12">
        <div>
            <h2>Crear Categoria</h2>
        </div>
        <div>
            <a href="{{route('categoria.index')}}" class="btn btn-primary">Volver</a>
        </div>
    </div>

    @if ($errors->any())
    <div class="alert alert-danger mt-2">
        <strong>Error en los campos</strong><br><br>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    <form action="{{route('categoria.store')}}" method="POST">
        @csrf
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                <div class="form-group">
                    <strong>Nombre:</strong>
                    <input type="text" name="nombre" class="form-control" placeholder="Nombre" >
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                <div class="form-group">
                    <strong>Descripción:</strong>
                    <textarea class="form-control" style="height:150px" name="descripcion" placeholder="Descripción..."></textarea>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 text-center mt-2">
                <button type="submit" class="btn btn-primary">Crear</button>
            </div>
        </div>
    </form>
</div>
@endsection