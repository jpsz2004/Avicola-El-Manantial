const agregarCompra = document.getElementById('agregarCompra-form');

agregarCompra.addEventListener('submit', async (event) => {
    event.preventDefault();

    const pedido_id = document.getElementById('pedido_id').value;
    const fecha_compra = document.getElementById('fecha_compra').value;
    const monto_total = document.getElementById('monto_total').value;

    try {
        const response = await fetch('http://localhost:4000/agregarCompra', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pedido_id, fecha_compra, monto_total }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar la compra. Verifique que el pedido está registrado o que no es un pedido que ya tiene registrada una compra.');
        }

        const data = await response.json();
        if (data.success) {
            alert('Compra agregada correctamente');
            window.location.href = '../../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});