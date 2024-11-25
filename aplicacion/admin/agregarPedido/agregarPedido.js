const agregarPedido = document.getElementById('agregarPedido-form');

agregarPedido.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id_proveedor = document.getElementById('id_proveedor').value;
    const fecha_pedido = document.getElementById('fecha_pedido').value;
    const estado = document.getElementById('estado').value;

    try {
        const response = await fetch('http://localhost:4000/agregarPedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_proveedor, fecha_pedido, estado }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el pedido. Verifique que el proveedor esté registrado.');
        }

        const data = await response.json();
        if (data.success) {
            alert('Pedido agregado correctamente');
            window.location.href = '../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});