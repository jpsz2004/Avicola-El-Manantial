const consultarStock = document.getElementById('stock-form');

consultarStock.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id_producto = document.getElementById('id').value.trim();

    if (!id_producto) {
        alert('Por favor, ingresa un ID válido.');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/consultarStock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_producto }),
        });

        // Limpiar contenido si no existe el producto
        document.getElementById('stock').textContent = '';

        if (!response.ok) {
            // Limpiar contenido si no existe el producto
            document.getElementById('stock').textContent = `Stock actual: 0`;
            throw new Error('Error al consultar el stock. El producto no se encuentra.');
        }

        const data = await response.json();
        if (data.success) {
            // Mostrar stock actual
            document.getElementById('stock').textContent = `Stock actual: ${data.stock_actual}`;
            
            // Verificar si el stock actual es menor que el stock mínimo
            if (data.stock_actual < data.stock_minimo) {
                alert(`Advertencia: El stock actual está por debajo del nivel mínimo. ${data.stock_actual} < ${data.stock_minimo}`);
            }
        } else {
            alert(data.message);
        }

    } catch (error) {
        alert(error.message);
    }
});
