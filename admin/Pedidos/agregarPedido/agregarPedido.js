const agregarPedido = document.getElementById('agregarPedido-form');

agregarPedido.addEventListener('submit', async (event) => {
    event.preventDefault();

    const proveedor_id = document.getElementById('proveedor_id').value;
    const fecha_pedido = document.getElementById('fecha_pedido').value;
    const estado_pedido = document.getElementById('estado_pedido').value;

    try {
        const response = await fetch('http://localhost:4000/agregarPedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ proveedor_id, fecha_pedido, estado_pedido }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el pedido. Verifique que el proveedor esté registrado.');
        }

        const data = await response.json();
        if (data.success) {
            alert('Pedido agregado correctamente');
            window.location.href = '../../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});