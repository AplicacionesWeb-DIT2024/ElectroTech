<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    @vite(['resources/css/app.css','resources/js/app.js'])
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">ElectroTech</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cetegoria
                </a>
                <ul class="dropdown-menu">    
                  <li class="nav-item">
                    <a class="dropdown-item" aria-current="page" href="{{url('categorias')}}">Listado</a>
                  </li>
                  <li class="dropdown-divider"></li>
                  <li class="nav-item">
                    <a class="dropdown-item" href="{{url('categorias/create')}}">Crear</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Producto
                </a>
                <ul class="dropdown-menu">   
                  <li class="nav-item">
                    <a class="dropdown-item" aria-current="page" href="{{url('productos')}}">Listado</a>
                  </li>
                  <li class="dropdown-divider"></li>
                  <li class="nav-item">
                    <a class="dropdown-item" href="{{url('productos/create')}}">Crear</a>
                  </li>
                  </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container mt-3">
      <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">@yield('title')</div>
                <div class="card-body">
                  @yield('body')
                </div>
            </div>
        </div>
    </div>
      </div>
</body>
  @yield('js')
</html>
