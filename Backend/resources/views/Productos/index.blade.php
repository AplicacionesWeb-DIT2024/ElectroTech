@extends('layouts.layout')
@section('title')
    Listado productos
@endsection
@section('body')
    @if($msj = Session::get('success'))
        <div class="row" id="alerta">
            <div class="col-md-4 offset-md-4">
                <div class="alert alert-success">
                    <p><i class="fa-solid fa-check"></i>{{$msj}}</p>
                </div>
            </div>
        </div>
    @endif
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NOMBRE</th>
                            <th>DESCRIPCION</th>
                            <th>CATEGORIA</th>
                            <th>PRECIO</th>
                            <th>GARANTIA</th>
                            <th>STOCK</th>
                            <th>IMAGEN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($productos as $i => $row)
                        <tr>
                            <td>{{ ($i+1) }}</td>
                            <td>{{ $row->nombre }}</td>
                            <td>{{ $row->descripcion }}</td>
                            <td>{{ $row->categoria_id }}</td>
                            <td>{{ $row->precio }}</td>
                            <td>{{ $row->garantia }}</td>
                            <td>{{ $row->stock }}</td>
                            <td>
                                <img class="img-fluid" width="120" src="/storage/{{ $row->image1}}">
                            </td>
                            <td>
                                <a class="btn btn-warning" href="{{route('productos.edit',$row->id)}}">
                                    <i class="fa-solid fa-edit"></i>
                                </a>

                                <form id="frm_{{$row->id}}" method="POST" action="{{route('productos.destroy',$row->id)}}">
                                    @method('DELETE')
                                    @csrf
                                    <button data-bs-toggle="modal" data-bs-target="#modalConfirmacion"
                                    onclick="setInfo({{$row->id}},'{{$row->nombre}}')" 
                                    type="button" class="btn btn-danger">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                {{$productos->links()}}
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
