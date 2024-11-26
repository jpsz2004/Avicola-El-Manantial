document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realizar la solicitud al servidor
        const response = await fetch("http://localhost:4000/usuarios");
        if (!response.ok) throw new Error("Error al obtener los usuarios");

        // Obtener los datos en formato JSON
        const usuarios = await response.json();

        // Seleccionar la tabla
        const tabla = document.getElementById("tabla-usuarios").querySelector("tbody");

        // Llenar la tabla con los datos
        usuarios.forEach(usuario => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario.DNI_usuario}</td>
                <td>${usuario.primer_nombre}</td>
                <td>${usuario.segundo_nombre}</td>
                <td>${usuario.primer_apellido}</td>
                <td>${usuario.segundo_apellido}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.rol}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        alert("No se pudo cargar los usuarios.");
    }
});