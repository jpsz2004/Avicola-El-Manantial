const buscarProducto = document.getElementById('buscar-form');

buscarProducto.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id_producto = document.getElementById('id').value;

    try {
        const response = await fetch('http://localhost:4000/obtenerProducto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_producto }),
        });

        if (!response.ok) {
            throw new Error('Error al buscar el producto. El producto no se encuentra');
        }

        const data = await response.json();
        if (data.success) {
            // Guardar los datos del producto en el almacenamiento local
            localStorage.setItem('producto', JSON.stringify(data.producto));

            // Redirigir al formulario de modificación
            window.location.href = '/admin/modificarProducto/modificarForm.html';
        }
    } catch (error) {
        alert(error.message);
    }
});