// Obtener referencias a los elementos del formulario
const modificarProducto = document.getElementById('modificar-form');
const idInput = document.getElementById('id');
const nombreInput = document.getElementById('nombre');
const tipoInput = document.getElementById('tipo');
const descripcionInput = document.getElementById('descripcion');
const precioInput = document.getElementById('precio');
const stockActualInput = document.getElementById('stock_actual');
const stockMinimoInput = document.getElementById('stock_minimo');
const unidadInput = document.getElementById('unidad');

// Llenar el formulario automáticamente al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const producto = JSON.parse(localStorage.getItem('producto')); // Obtener producto del almacenamiento local
    if (producto) {
        idInput.value = producto.producto_id;
        nombreInput.value = producto.nombre_producto;
        tipoInput.value = producto.tipo_producto;
        descripcionInput.value = producto.descripcion;
        precioInput.value = producto.precio_venta;
        stockActualInput.value = producto.stock_actual;
        stockMinimoInput.value = producto.stock_minimo;
        unidadInput.value = producto.unidad_medida;
    }
});

// Manejar el evento de envío del formulario
modificarProducto.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que la página se recargue

    // Obtener los valores del formulario
    const id_producto = idInput.value;
    const nombre = nombreInput.value;
    const tipo = tipoInput.value;
    const descripcion = descripcionInput.value;
    const precio = parseFloat(precioInput.value);
    const stock_actual = parseInt(stockActualInput.value, 10);
    const stock_min = parseInt(stockMinimoInput.value, 10);
    const unidad_medida = unidadInput.value;

    try {
        // Realizar la solicitud para modificar el producto
        const response = await fetch('http://localhost:4000/modificarProducto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_producto, nombre, tipo, descripcion, precio, stock_actual, stock_min, unidad_medida }),
        });

        if (!response.ok) {
            throw new Error('Error al modificar el producto. Verifique los datos ingresados.');
        }

        const data = await response.json();
        if (data.success) {
            alert('Producto modificado correctamente');
            localStorage.removeItem('producto'); // Limpiar el almacenamiento local
            window.location.href = '/admin/Productos/modificarProducto/buscarForm.html'; // Redirigir a la página de administración
        } else {
            alert('No se pudo modificar el producto. Inténtelo nuevamente.');
        }
    } catch (error) {
        alert(error.message);
    }
});

// Opcional: Manejar el cambio del ID (Si deseas buscar y actualizar automáticamente)
idInput.addEventListener('post', async () => {
    const id = idInput.value;

    if (!id) return;

    try {
        // Consultar el producto al cambiar el ID
        const response = await fetch('http://localhost:4000/obtenerProducto');
        
        if (!response.ok) {
            throw new Error('Producto no encontrado o error en la consulta');
        }

        const data = await response.json();
        if (data.success) {
            // Llenar los campos del formulario con los datos del producto
            const producto = data.producto;
            nombreInput.value = producto.nombre_producto;
            tipoInput.value = producto.tipo_producto;
            descripcionInput.value = producto.descripcion;
            precioInput.value = producto.precio_venta;
            stockActualInput.value = producto.stock_actual;
            stockMinimoInput.value = producto.stock_minimo;
            unidadInput.value = producto.unidad_medida;
        } else {
            alert('El producto no existe.');
        }
    } catch (error) {
        alert(error.message);
    }
});
