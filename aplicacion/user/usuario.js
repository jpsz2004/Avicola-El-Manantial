document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el DNI del usuario del localStorage
    const DNI_usuario = localStorage.getItem('DNI_usuario');

    if (!DNI_usuario) {
        alert('No se pudo identificar al usuario. Por favor, inicie sesión nuevamente.');
        window.location.href = '../home/index.html'; // Redirigir al inicio de sesión
        return;
    }

    try {
        // Hacer la solicitud al servidor para obtener el nombre del usuario
        const response = await fetch('http://localhost:4000/nombreUsuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DNI_usuario }),
        });

        if (!response.ok) {
            throw new Error('Error al obtener el nombre del usuario.');
        }

        const data = await response.json();

        if (data.success) {
            // Actualizar el texto de bienvenida
            const bienvenidaText = document.querySelector('.bienvenida-text');
            bienvenidaText.textContent = `¡Bienvenido(a), ${data.nombre}!`;
        } else {
            alert(data.message || 'No se pudo obtener la información del usuario.');
        }
    } catch (error) {
        console.error('Error al cargar el nombre del usuario:', error);
        alert('Hubo un error al cargar la página. Por favor, intente nuevamente.');
    }
});
