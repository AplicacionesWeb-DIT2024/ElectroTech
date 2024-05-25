@extends('Productos.form')
@section('formName')
    Nuevo Producto
@endsection
@section('action')
    action = "{{route('productos.store')}}"
@endsection
