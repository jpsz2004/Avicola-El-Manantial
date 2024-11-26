const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const dni = document.getElementById('dni').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dni, password }),
        });

        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('DNI_usuario', dni);

            if (data.rol === 'administrador') {
                window.location.href = '../admin/admin.html'; // Redirige al panel de administrador
            } else if (data.rol === 'vendedor') {
                window.location.href = '../user/usuario.html'; // Redirige al panel de usuario
            }
        }
    } catch (error) {
        alert(error.message); // Muestra un mensaje de error al usuario
    }
});


