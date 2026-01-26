@extends('Productos.form')
@section('icon')
<i class="fa-solid fa-pen-to-square"></i>
@endsection
@section('formName')
    Editar {{$producto->nombre}}
@endsection
@section('action')
    action = "{{route('productos.update',$producto)}}"
@endsection
@section('method') @method('PUT') @endsection
