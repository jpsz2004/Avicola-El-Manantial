const agregarPago = document.getElementById('agregarPago-form');

agregarPago.addEventListener('submit', async (event) => {
    event.preventDefault();

    const venta_id = document.getElementById('venta_id').value;
    const monto_pagado = document.getElementById('monto_pagado').value;
    const fecha_pago = document.getElementById('fecha_pago').value;
    const metodo_pago = document.getElementById('metodo_pago').value;
    const estado = document.getElementById('estado').value;

    try {
        const response = await fetch('http://localhost:4000/agregarPago', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ venta_id, monto_pagado, fecha_pago, metodo_pago, estado }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el pago. Verifique que la venta esté registrada.');
        }

        const data = await response.json();
        if (data.success) {
            alert(`Pago agregado correctamente. Saldo pendiente: ${data.saldo_pendiente}`);
            window.location.href = '../../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});
