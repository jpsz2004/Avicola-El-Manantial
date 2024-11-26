const registro = document.getElementById('registro-form');

registro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const DNI_usuario = document.getElementById('dni').value;
    const primer_nombre = document.getElementById('primer-nombre').value;
    const segundo_nombre = document.getElementById('segundo-nombre').value;
    const primer_apellido = document.getElementById('primer-apellido').value;
    const segundo_apellido = document.getElementById('segundo-apellido').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/registrarUsuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, password }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el usuario. Verifique que el usuario no existe en la base de datos.');
        }

        const data = await response.json();
        if (data.success) {
            alert('Usuario (vendedor) agregado correctamente');
            window.location.href = '../home/index.html';
        }
    } catch (error) {
        alert(error.message);
    }
});