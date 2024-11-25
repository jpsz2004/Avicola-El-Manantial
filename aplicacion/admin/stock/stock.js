const consultarStock = document.getElementById('stock-form');

consultarStock.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id_producto = document.getElementById('id').value.trim(); // Eliminar espacios

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
            document.getElementById('stock').textContent = `Stock actual: ${data.stock_actual}`;
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert(error.message);
    }
});
