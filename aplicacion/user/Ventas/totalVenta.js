const totalForm = document.getElementById('total-form');

totalForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const ventaId = document.getElementById('id').value.trim();

    if (!ventaId) {
        alert('Por favor, ingresa un ID válido.');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/totalVenta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: ventaId }),
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener el total de la venta. Verifica el ID ingresado.');
        }

        const data = await response.json();
        if (data.success) {
            const totalElement = document.getElementById('total');
            totalElement.textContent = data.total; 
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert(error.message);
    }
});
