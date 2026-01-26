@extends('layouts.layout')
@section('icon')
<i class="fa-solid fa-list"></i>
@endsection
@section('title')
    Listado Novedades
@endsection

@section('body')

<div class="row">
    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr class="text-secondary">
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($news as $item)
                        <tr>
                            <td class="fw-bold">{{$item->title}} </td>
                            <td>{{$item->description}}</td> 
                            <td style="text-align: center">
                                <a href="{{ route('news.edit', $item) }}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </a>

                                <form id="frm_{{$item->id}}" action="{{ route('news.destroy', $item) }}" method="post" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button data-bs-toggle="modal" data-bs-target="#modalConfirmacion"
                                    onclick="setInfo({{$item->id}},'la novedad','{{$item->title}}')" 
                                    type="button" class="btn btn-danger">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr> 
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="4" scope="row" style="text-align: right">
                        <a href="{{route('news.create')}}" class="btn btn-primary">Crear novedad</a>
                        </th>
                    </tr>
                </tfoot>
            </table>
        {{$news->links()}}
        </div>
    </div>
</div>
<div class="modal" tabindex="-1" id="modalConfirmacion">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">¿Seguro de eliminar?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><i class="fa-solid fa-warning fs-3 text-warning"></i>
                <label id="lbl_nombre"></label>
                </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" 
              data-bs-dismiss="modal">Cancelar</button>
              <button id="btnEliminar" type="button" class="btn btn-success">Si, eliminar</button>
            </div>
          </div>
        </div>
      </div>
@endsection
@section('js')
    @vite('resources/js/index.js')
@endsection