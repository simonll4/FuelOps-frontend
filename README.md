## Frontend - FuelOps

### Descripción General
Esta aplicación cliente, desarrollada en Vue.js, está diseñada para interactuar con el sistema backend [FuelOps](https://github.com/simonll4/FuelOps-backend). FuelOps administra y monitorea órdenes de carga de gas líquido en plantas de combustible, integrando datos en tiempo real y sincronizándose con sistemas externos. La aplicación cliente permite a los usuarios realizar diferentes tareas dependiendo de su rol.

### Roles y Funcionalidades

La aplicación cuenta con dos tipos de usuarios: **Administrador** y **Operador**. A continuación, se describen las funcionalidades disponibles para cada rol:

#### Rol Administrador

- **Ver Listado de Órdenes:** Acceso a un listado completo de todas las órdenes.
  [Vista de Listado de Órdenes](./doc-assets/listado-ordenes.png)

- **Ver Detalle de Órdenes:** Visualizar información detallada de una orden específica. Durante el proceso de carga de combustible, el detalle de la orden se actualiza en tiempo real utilizando la tecnología WebSockets.
  
  [Vista de Detalle de Orden (parte 1)](./doc-assets/detalle-orden-1.png)

  [Vista de Detalle de Orden (parte 2)](./doc-assets/detalle-orden-2.png)

- **Gestionar Usuarios:** Crear, editar y eliminar usuarios del sistema.Durante el proceso de carga de combustible, el detalle de la orden se actualiza en tiempo real utilizando la tecnología WebSockets.
  [Vista de Gestion de Usuarios](./doc-assets/gestion-usuarios.png)

- **Gestionar Productos:** Crear, editar y eliminar productos.
  [Vista de Gestión de Productos](./doc-assets/gestion-productos.png)

#### Rol Operador

- **Ver Listado de Órdenes:** Acceso al listado de órdenes asignadas.
  [Vista de Listado de Órdenes](./doc-assets/listado-ordenes.png)

- **Ver Detalle de Órdenes:** Visualizar información detallada de una orden.
  
  [Vista de Detalle de Orden (parte 1)](./doc-assets/detalle-orden-1.png)

  [Vista de Detalle de Orden (parte 2)](./doc-assets/detalle-orden-2.png)

### Tecnologías Usadas
- **Vue.js:** Framework principal para el desarrollo de la interfaz de usuario.
- **TanStack Query:** Manejo de consultas y sincronización de datos con el backend.
- **Pinia:** Administración del estado global de la aplicación.
- **Vuetify:** Librería gráfica para diseños modernos y responsivos.
- **Sass:** Preprocesador CSS para estilos más mantenibles y personalizados.
- **WebSockets:** Sincronización en tiempo real de datos críticos como el detalle de órdenes durante la carga.
- **HTTP (REST):** Comunicación entre cliente y backend para consultas y modificaciones de datos.

## Contribuidores
- [Simonll4](https://github.com/simonll4)
- [MattGoode7](https://github.com/MattGoode7)
- [Pandulc](https://github.com/Pandulc)
