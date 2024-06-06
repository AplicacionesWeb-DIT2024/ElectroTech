@extends('layouts.layout')
@section('title')
    @yield('formName')
@endsection

@section('css')
<style>

    form li, div > p {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      list-style-type: none;
    }

    form img {
      height: 64px;
      order: 1;
    }

    form label {
      cursor: pointer;
    }

    form label, form button {
      background-color:var(--bs-tertiary-bg);
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.8rem;
      height: auto;
    }

    form label:hover, form button:hover {
      background-color: #2D5BA3;
      color: white;
    }

    form label:active, form button:active {
      background-color: #0D3F8F;
      color: white;
    }
  </style>
@endsection

@section('body')
    @if($errors->any())
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-danger">
                <p><b><i class="fa-solid fa-times"></i> Errores </b></p>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
    @endif

<form @yield('action') method="post" enctype="multipart/form-data">
@yield('method')
@csrf
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-mobile"></i></span>
    <input type="text" name="nombre" class="form-control" placeholder="Nombre"
    @isset($producto) value="{{$producto->nombre}}" @endisset required>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-keyboard"></i></span>
    <textarea class="form-control" style="height:150px" name="descripcion" placeholder="Descripción..."  required>@isset($producto) {{$producto->descripcion}} @endisset</textarea>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-list"></i></span>
    <select name="categoria_id" id="categorias" class="form-control" required>
        <option value=""> -- Categoria --</option>
        @foreach ($categorias as $clave => $valor)
            <option value="{{ $clave }}" @isset($producto) @if($producto->categoria_id == $clave) selected @endif @endisset>{{ $valor }}</option>
        @endforeach 
    </select>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
    <input type="number" name="precio" class="form-control" placeholder="Precio"
    @isset($producto) value="{{$producto->precio }}" @endisset required>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-regular fa-calendar"></i></span>
    <input type="number" name="garantia" class="form-control" placeholder="Periodo de garantia"
    @isset($producto) value="{{$producto->garantia}}" @endisset required>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-boxes-stacked"></i></span>
    <input type="number" name="stock" class="form-control" placeholder="Stock"
    @isset($producto) value="{{$producto->stock}}" @endisset required>
</div>

<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-image"></i></span>
    <label for="image1" class="input-group-text">Examinar... (PNG, JPG)</label>
    <input type="file" id="image1" name="image1" style="display:none;"
    @if(!isset($producto)) required @endif accept="image/*">
    <div class="preview form-control" id="preview1">
    @if(@isset($producto->image1)) 
        <img src="/storage//{{$producto->image1}}">
    @else
        <p>No se seleccionó un archivo.</p>
    @endif
    </div>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-image"></i></span>
    <label for="image2" class="input-group-text">Examinar... (PNG, JPG)</label>
    <input type="file" id="image2" name="image2" style="display:none;" accept="image/*">
    <div class="preview form-control" id="preview2">
    @if(@isset($producto->image2)) 
        <img src="/storage//{{$producto->image2}}">
    @else
        <p>No se seleccionó un archivo.</p>
    @endif
    </div>
</div>
<div class="input-group mb-3">
    <span class="input-group-text"><i class="fa-solid fa-image"></i></span>
    <label for="image3" class="input-group-text">Examinar... (PNG, JPG)</label>
    <input type="file" id="image3" name="image3" style="display:none;" accept="image/*">
    <div class="preview form-control" id="preview3">
    @if(@isset($producto->image3)) 
        <img src="/storage//{{$producto->image3}}">
    @else
        <p>No se seleccionó un archivo.</p>
    @endif
    </div>
</div>
<a href="{{route('productos.index')}}" class="btn btn-primary">Cancelar</a>
<button class="btn btn-success" type="submit"> Guardar </button>
</form>

<script>
    const input1 = document.querySelector('#image1');
    const preview1 = document.querySelector('#preview1');

    input1.addEventListener('change', function(){
        updateImageDisplay(preview1, input1);
    }, false);

    const input2 = document.querySelector('#image2');
    const preview2 = document.querySelector('#preview2');

    input2.addEventListener('change', function(){
        updateImageDisplay(preview2, input2);
    }, false);

    const input3 = document.querySelector('#image3');
    const preview3 = document.querySelector('#preview3');

    input3.addEventListener('change', function(){
        updateImageDisplay(preview3, input3);
    }, false);

    function updateImageDisplay(preview, input) {
      while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
      }

      const curFiles = input.files;
      if(curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
      } else {
        const list = document.createElement('ol');
        preview.appendChild(list);

        for(const file of curFiles) {
          const listItem = document.createElement('li');
          const para = document.createElement('p');
          const butt = document.createElement('button')

          if(validFileType(file)) {
            para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);

/*             butt.textContent = 'Click me!';
            butt.setAttribute('type', 'button');
            butt.setAttribute("onClick", 'resetFile()'); */

            listItem.appendChild(image);
            listItem.appendChild(para);
/*             listItem.appendChild(butt); */
          } else {
            para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
            listItem.appendChild(para);
          }

          list.appendChild(listItem);
        }
      }
    }

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
    const fileTypes = [
        'image/apng',
        'image/bmp',
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/svg+xml',
        'image/tiff',
        'image/webp',
        `image/x-icon`
    ];

    function validFileType(file) {
      return fileTypes.includes(file.type);
    }

    function returnFileSize(number) {
      if(number < 1024) {
        return number + 'bytes';
      } else if(number > 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
      } else if(number > 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
      }
    }
    function resetFile() {
            const file = document.querySelector('#image1');
            alert('Llego');
            file.value = null;
            const preview = document.querySelector('#preview1');
            preview.removeChild(preview.firstChild);
        }
  </script>
@endsection
