const eliminarProducto = document.getElementById('eliminar-form');
const volver = document.getElementById('btn-volver');

eliminarProducto.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id_producto = document.getElementById('id').value;

    try {
        const response = await fetch('http://localhost:4000/eliminarProducto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_producto }),
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        const data = await response.json();
        if (data.success) {
            alert('Producto eliminado correctamente');
            window.location.href = '../../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});

volver.addEventListener('click', async (event) => {
    event.preventDefault();
    window.location.href = '../productos.html';
});