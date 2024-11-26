document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realizar la solicitud al servidor
        const response = await fetch("http://localhost:4000/clientes");
        if (!response.ok) throw new Error("Error al obtener los clientes");

        // Obtener los datos en formato JSON
        const clientes = await response.json();

        // Seleccionar la tabla
        const tabla = document.getElementById("tabla-clientes").querySelector("tbody");

        // Llenar la tabla con los datos
        clientes.forEach(cliente => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${cliente.DNI_cliente}</td>
                <td>${cliente.nombre_cliente}</td>
                <td>${cliente.tipo_cliente}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar los clientes:", error);
        alert("No se pudo cargar el historial de clientes.");
    }
});