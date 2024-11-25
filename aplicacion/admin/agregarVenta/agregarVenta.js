const agregarVenta = document.getElementById('agregarVenta-form');

agregarVenta.addEventListener('submit', async (event) => {
    event.preventDefault();

    const DNI_usuario = document.getElementById('dni_usuario').value;
    const DNI_cliente = document.getElementById('dni_cliente').value;
    const fecha_venta = document.getElementById('fecha_venta').value;
    const total_venta = document.getElementById('total_venta').value;

    try {
        const response = await fetch('http://localhost:4000/agregarVenta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DNI_usuario, DNI_cliente, fecha_venta, total_venta }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar la venta. Verifique que el usuario y el cliente esten registrados.');
        }

        const data = await response.json();
        if (data.success) {
            alert('Venta agregada correctamente');
            window.location.href = '../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});

