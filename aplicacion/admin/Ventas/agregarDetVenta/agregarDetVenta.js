const agregarDetVentaForm = document.getElementById('agregarDetVenta-form');

agregarDetVentaForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const venta_id = document.getElementById('id_venta').value;
    const producto_id = document.getElementById('id_producto').value;
    const cantidad_vendida = document.getElementById('cantidad').value;
    const precio_unitario = document.getElementById('precio_unitario').value;

    try {
        const response = await fetch('http://localhost:4000/agregarDetVenta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ venta_id, producto_id, cantidad_vendida, precio_unitario }),
        });

        if(!response.ok) {
            throw new Error('Error al agregar el detalle de la venta.');
        }


        const data = await response.json();
        if (!data.success) {
            alert(data.message);
        }

        
        if (data.success) {
            // Mostrar el subtotal
            document.getElementById('subtotal').textContent = `Subtotal: ${data.subtotal}`;

            // Mostrar el stock actual
            document.getElementById('stock').textContent = `Stock actual: ${data.stock_actual} (Mínimo: ${data.stock_minimo})`;

            // Mostrar alerta si el stock está por debajo del mínimo
            if (data.alert) {
                alert(data.alert);
            }

            // Mostrar mensaje de éxito
            alert(data.message);
        }
    } catch (error) {
        alert(error.message);
    }
});