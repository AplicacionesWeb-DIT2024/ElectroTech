@extends('layouts.layout')
@section('icon')
<i class="fa-solid fa-list"></i>
@endsection
@section('title')
    Listado categorias
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
                    @foreach ($categorias as $categoria)
                        <tr>
                            <td class="fw-bold">{{$categoria->nombre}} </td>
                            <td>{{$categoria->descripcion}}</td> 
                            <td style="text-align: center">
                                <a href="{{ route('categorias.edit', $categoria) }}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </a>

                                <form id="frm_{{$categoria->id}}" action="{{ route('categorias.destroy', $categoria) }}" method="post" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button data-bs-toggle="modal" data-bs-target="#modalConfirmacion"
                                    onclick="setInfo({{$categoria->id}},'la categoria','{{$categoria->nombre}}')" 
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
                        <a href="{{route('categorias.create')}}" class="btn btn-primary">Crear categoria</a>
                        </th>
                    </tr>
                </tfoot>
            </table>
        {{$categorias->links()}}
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