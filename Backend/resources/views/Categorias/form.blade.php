@extends('layouts.layout')
@section('title')
    @yield('formName')
@endsection
@section('body')
    @if($errors->any())
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-danger">
                <p><b><i class="fa-solid fa-times"></i> Errores </b></p>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
    @endif

<form @yield('action') method="post" enctype="multipart/form-data">
@yield('method')
@csrf
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-hashtag"></i></span>
    <input type="text" name="nombre" class="form-control" placeholder="Nombre"
    @isset($categoria) value="{{$categoria->nombre}}" @endisset required>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-keyboard"></i></span>
    <textarea class="form-control" style="height:150px" name="descripcion" placeholder="Descripción..."  required>@isset($categoria) {{$categoria->descripcion}} @endisset</textarea>
</div>
<a href="{{route('categorias.index')}}" class="btn btn-primary">Cancelar</a>
<button class="btn btn-success" type="submit"> Guardar </button>
</form>

@endsection
