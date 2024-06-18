@extends('layouts.layout')
@section('icon')
<i class="fa-solid fa-list"></i>
@endsection
@section('title')
    Listado productos
@endsection
@section('body')
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
                            <td>{{ $row->categoria->nombre }}</td>
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
                                    onclick="setInfo({{$row->id}},'el Producto','{{$row->nombre}}')" 
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
                            <th colspan="9" scope="row" style="text-align: right">
                            <a href="{{route('productos.create')}}" class="btn btn-primary">Nuevo Producto</a>
                            </th>
                        </tr>
                    </tfoot>
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
