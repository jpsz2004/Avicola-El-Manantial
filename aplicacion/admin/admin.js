const agregarProducto = document.getElementById('btn-agregar');
const modificarProducto = document.getElementById('btn-modificar');
const eliminarProducto = document.getElementById('btn-eliminar');
const verProductos = document.getElementById('btn-listar');
const consultarStock = document.getElementById('btn-stock');
const agregarProveedor = document.getElementById('btn-agregar-proveedor');
const verProveedores = document.getElementById('btn-listar-proveedores');
const verVentas = document.getElementById('btn-ver-ventas');
const agregarVenta = document.getElementById('btn-agregar-venta');
const agregarDetVenta = document.getElementById('btn-agregar-det-venta');
const agregarPedido = document.getElementById('btn-agregar-pedido');
const cerrarSesion = document.getElementById('btn-cerrar');


// Llamar el endpoint de agregar para ir al html de agregar
agregarProducto.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/agregarProducto/agregarForm.html'; // Redirige al formulario para agregar un producto
});

// Llamar el endpoint de modificar para ir al html de modificar
modificarProducto.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/modificarProducto/buscarForm.html'; // Redirige al formulario para modificar un producto
});

// Llamar el endpoint de eliminar para ir al html de eliminar
eliminarProducto.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/eliminarProducto/eliminarForm.html'; // Redirige al formulario para eliminar un producto
});

// Llamar el endpoint de listar para ir al html de listar
verProductos.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/inventario/listar.html'; // Redirige al formulario para listar los productos
});

// Llamar el endpoint de stock para ir al html de stock
consultarStock.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/stock/stock.html'; // Redirige al formulario para consultar el stock
});

// Llamar el endpoint de agregar proveedor para ir al html de agregar proveedor
agregarProveedor.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/agregarProveedor/agregarProv.html'; // Redirige al formulario para agregar un proveedor
});

// Llamar el endpoint de listar proveedores para ir al html de listar proveedores
verProveedores.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/listaProveedores/listarProv.html'; // Redirige al formulario para listar los proveedores
});

// Llamar el endpoint de ventas para ir al html de ventas
verVentas.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/historialVentas/ventas.html'; // Redirige al formulario para ver las ventas
});

// Llamar el endpoint de agregar venta para ir al html de agregar venta
agregarVenta.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/agregarVenta/agregarVenta.html'; // Redirige al formulario para agregar una venta
});

// Llamar el endpoint de agregar detalle de venta para ir al html de agregar detalle de venta
agregarDetVenta.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/agregarDetVenta/agregarDetVenta.html'; // Redirige al formulario para agregar un detalle de venta
});

// Llamar el endpoint de agregar pedido para ir al html de agregar pedido
agregarPedido.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/agregarPedido/agregarPedido.html'; // Redirige al formulario para agregar un pedido
});

// Cerrar sesión
cerrarSesion.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    localStorage.removeItem('token'); // Elimina el token del local storage
    window.location.href = '../home/index.html'; // Redirige al formulario de login
});
