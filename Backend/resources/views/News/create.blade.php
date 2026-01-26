@extends('News.form')
@section('icon')
<i class="fa-solid fa-plus"></i>
@endsection
@section('formName')
    Nueva Novedad
@endsection
@section('action')
    action = "{{route('news.store')}}"
@endsection