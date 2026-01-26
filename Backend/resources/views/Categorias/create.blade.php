@extends('Categorias.form')
@section('icon')
<i class="fa-solid fa-plus"></i>
@endsection
@section('formName')
    Nueva Categoria
@endsection
@section('action')
    action = "{{route('categorias.store')}}"
@endsection