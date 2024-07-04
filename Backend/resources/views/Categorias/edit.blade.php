@extends('Categorias.form')
@section('icon')
<i class="fa-solid fa-pen-to-square"></i>
@endsection
@section('formName')
    Editar {{$categoria->nombre}}
@endsection
@section('action')
    action = "{{route('categorias.update',$categoria)}}"
@endsection
@section('method') @method('PUT') @endsection