const agregarDetCompraForm = document.getElementById('agregarDetCompra-form');

agregarDetCompraForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const compra_id = document.getElementById('compra_id').value;
    const producto_id = document.getElementById('producto_id').value;
    const cantidad_comprada = document.getElementById('cantidad_comprada').value;
    const precio_unitario = document.getElementById('precio_unitario').value;

    try {
        const response = await fetch('http://localhost:4000/agregarDetCompra', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ producto_id, compra_id, cantidad_comprada, precio_unitario }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el detalle de la compra. Verifique la existencia del producto y la compra.');
        }

        const data = await response.json();
        const subtotal = precio_unitario * cantidad_comprada;

        if (data.success) {
            // Mostrar el subtotal
            const subtotalElement = document.getElementById('subtotal');
            subtotalElement.textContent = `Subtotal: ${subtotal}`;

            // Mostrar el stock actual
            alert(`Stock actual: ${data.stock_actual}. Stock mínimo: ${data.stock_minimo}`);

            // Mostrar alerta si el stock sigue por debajo del mínimo
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
