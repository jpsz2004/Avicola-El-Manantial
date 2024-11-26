const agregarProveedor = document.getElementById('agregarProv-form');

agregarProveedor.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const productos = document.getElementById('productos').value;

    try {
        const response = await fetch('http://localhost:4000/agregarProveedor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono, direccion, productos }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el proveedor');
        }

        const data = await response.json();
        if (data.success) {
            alert('Proveedor agregado correctamente');
            window.location.href = '../../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});