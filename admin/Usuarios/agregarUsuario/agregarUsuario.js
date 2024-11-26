const agregarUsuario = document.getElementById('agregarUsuario-form');

agregarUsuario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const DNI_usuario = document.getElementById('dni').value;
    const primer_nombre = document.getElementById('primerNombre').value;
    const segundo_nombre = document.getElementById('segundoNombre').value;
    const primer_apellido = document.getElementById('primerApellido').value;
    const segundo_apellido = document.getElementById('segundoApellido').value;
    const telefono = document.getElementById('telefono').value;
    const rol = document.getElementById('rol').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/agregarUsuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, rol, password }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el usuario. Verifique que el usuario no existe en la base de datos.');
        }

        const data = await response.json();
        if (data.success) {
            alert('Usuario agregado correctamente');
            window.location.href = '../../admin.html';
        }
    } catch (error) {
        alert(error.message);
    }
});