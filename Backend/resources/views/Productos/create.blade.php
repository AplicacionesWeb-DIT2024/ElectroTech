@extends('Productos.form')
@section('icon')
<i class="fa-solid fa-plus"></i>
@endsection
@section('formName')
    Nuevo Producto
@endsection
@section('action')
    action = "{{route('productos.store')}}"
@endsection
