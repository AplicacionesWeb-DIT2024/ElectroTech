# ElectroTech
## Descripción del proyecto 

Se desarrollara un proyecto del tipo ecommerce para la venta de productos electrónicos (como pueden ser smartphones, tablets, notebooks, etc), el cual se dividirá en un backend destinado al uso administrativo, y un frontend destinado a los usuarios.

### Backend

Este lado de la aplicación sera desarrollado en Laravel, y permitirá el acceso de los administrativos para realizar las tareas de ABM(alta, baja, y modificación) tanto de los productos(nombre, descripción, fotos, stock, precio, periodo de garantía) como de las categorías(nombre, descripción) y marcas que engloban a los mismos.
También se podrá utilizar para la gestión de usuarios administradores o con permisos de gestión, creando, eliminando, o modificandolos. 

### Frontend

Por otro lado, el frontend de la aplicación sera implementado usando react. Aquí se podrá navegar por la pagina web, filtrando productos por categoría, precio, marca, ademas de poder visualizarlos con sus fotos, descripción, precio, y stock disponible y agregarlos a su carrito de compras, pudiendo también realizar valoraciones sobre los productos adquiridos. 
Ademas, se encargara de la creación(registro) y autentificación de cuentas de usuario del tipo cliente, necesarias tanto para la compra de productos en la web, como también para realizar valoraciones sobre estos. Sin embargo la mera visualización podrá realizarse sin necesariamente haberse logueado.
