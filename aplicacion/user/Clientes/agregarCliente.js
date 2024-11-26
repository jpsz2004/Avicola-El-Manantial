const agregarCliente = document.getElementById('agregarCliente-form');

agregarCliente.addEventListener('submit', async (event) => {
    event.preventDefault();

    const DNI_cliente = document.getElementById('dni').value;
    const nombre_cliente = document.getElementById('nombre').value;
    const tipo_cliente = document.getElementById('tipo').value;
    const total_compras = document.getElementById('total_compras').value;

    try {
        const response = await fetch('http://localhost:4000/agregarCliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DNI_cliente, nombre_cliente, tipo_cliente, total_compras }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el cliente');
        }

        const data = await response.json();
        if (data.success) {
            alert('Cliente agregado correctamente');
            window.location.href = '../usuario.html';
        }
    } catch (error) {
        alert(error.message);
    }
});