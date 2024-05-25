@extends('Productos.form')
@section('formName')
    Editar <b>{{$producto->nombre}}</b>
@endsection
@section('action')
    action = "{{route('productos.update',$producto)}}"
@endsection
@section('method') @method('PUT') @endsection
