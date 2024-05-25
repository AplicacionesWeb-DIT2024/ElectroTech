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
    <span class="input-group-text"><i class="fa-solid fa-mobile"></i></span>
    <input type="text" name="nombre" class="form-control" placeholder="Nombre"
    @isset($producto) value="{{$producto->nombre}}" @endisset required>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-keyboard"></i></span>
    <textarea class="form-control" style="height:150px" name="descripcion" placeholder="Descripción..."  required>@isset($producto) {{$producto->descripcion}} @endisset</textarea>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-list"></i></span>
    <select name="categoria_id" id="categorias" class="form-control" required>
        <option value=""> -- Categoria --</option>
        @foreach ($categorias as $clave => $valor)
            <option value="{{ $clave }}" {{ (isset($producto->categoria_id) || old('id'))? "selected":"" }}>{{ $valor}}</option>
        @endforeach 
    </select>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
    <input type="number" name="precio" class="form-control" placeholder="Precio"
    @isset($producto) value="{{$producto->precio }}" @endisset required>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-regular fa-calendar"></i></span>
    <input type="number" name="garantia" class="form-control" placeholder="Periodo de garantia"
    @isset($producto) value="{{$producto->garantia}}" @endisset required>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-boxes-stacked"></i></span>
    <input type="number" name="stock" class="form-control" placeholder="Stock"
    @isset($producto) value="{{$producto->stock}}" @endisset required>
</div>

<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-image"></i></span>
    <input type="file" name="image1" class="form-control"
    @if(!isset($producto)) required @endif accept="image/*">
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-image"></i></span>
    <input type="file" name="image2" class="form-control" accept="image/*">
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-image"></i></span>
    <input type="file" name="image3" class="form-control" accept="image/*">
</div>
<button class="btn btn-success" type="submit"> Guardar </button>
</form>

@endsection
