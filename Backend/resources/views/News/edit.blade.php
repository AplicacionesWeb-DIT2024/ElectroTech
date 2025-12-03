@extends('News.form')
@section('icon')
<i class="fa-solid fa-pen-to-square"></i>
@endsection
@section('formName')
    Editar {{$news->title}}
@endsection
@section('action')
    action = "{{route('news.update',$news)}}"
@endsection
@section('method') @method('PUT') @endsection