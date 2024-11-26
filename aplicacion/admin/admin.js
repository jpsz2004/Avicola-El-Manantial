const productos = document.getElementById('productos');
const proveedores = document.getElementById('proveedores');
const ventas = document.getElementById('ventas');
const pedidos = document.getElementById('pedidos');
const compras = document.getElementById('compras');
const clientes = document.getElementById('clientes');
const pagos = document.getElementById('pagos');
const usuarios = document.getElementById('usuarios');
const cerrarSesion = document.getElementById('btn-cerrar');

productos.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/Productos/productos.html'; // Redirige al formulario para listar los productos
});

proveedores.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/Proveedores/proveedores.html'; // Redirige al formulario para listar los proveedores
});

ventas.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/Ventas/ventas.html'; // Redirige al formulario para ver las ventas
});

pedidos.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/Pedidos/pedidos.html'; // Redirige al formulario para listar los pedidos
});

compras.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/Compras/compras.html'; // Redirige al formulario para listar las compras
});

clientes.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/Clientes/clientes.html'; // Redirige al formulario para listar los clientes
});

pagos.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/Pagos/pagos.html'; // Redirige al formulario para listar los pagos
});

usuarios.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    window.location.href = '../admin/Usuarios/usuarios.html'; // Redirige al formulario para listar los usuarios
});

// Cerrar sesión
cerrarSesion.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    localStorage.removeItem('token'); // Elimina el token del local storage
    localStorage.removeItem('DNI_usuario'); // Elimina el DNI del local storage
    window.location.href = '../home/index.html'; // Redirige al formulario de login
});
