const agregarDetPedidoForm = document.getElementById('agregarDetPedido-form');

agregarDetPedidoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const pedido_id = document.getElementById('pedido_id').value;
    const producto_id = document.getElementById('producto_id').value;
    const cantidad_solicitada = document.getElementById('cantidad_solicitada').value;
    const cantidad_recibida = document.getElementById('cantidad_recibida').value;

    try {
        const response = await fetch('http://localhost:4000/agregarDetPedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ producto_id, pedido_id, cantidad_solicitada, cantidad_recibida}),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el detalle del pedido. Verifique la existencia del producto y el pedido.');
        }

        const data = await response.json();
        if (data.success) {
            alert(data.message);
            window.location.href = '../../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});