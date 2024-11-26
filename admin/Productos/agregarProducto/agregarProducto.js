const agregarProducto = document.getElementById('agregar-form');
const volver = document.getElementById('btn-volver');

agregarProducto.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const stock_actual = document.getElementById('stock').value;
    const stock_min = document.getElementById('stock_min').value;
    const unidad_medida = document.getElementById('unidad').value;

    try {
        const response = await fetch('http://localhost:4000/agregar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, tipo, descripcion, precio, stock_actual, stock_min, unidad_medida }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el producto');
        }

        const data = await response.json();
        if (data.success) {
            alert('Producto agregado correctamente');
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