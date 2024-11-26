document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realizar la solicitud al servidor
        const response = await fetch("http://localhost:4000/pedidos");
        if (!response.ok) throw new Error("Error al obtener los pedidos");

        // Obtener los datos en formato JSON
        const pedidos = await response.json();

        // Seleccionar la tabla
        const tabla = document.getElementById("tabla-pedidos").querySelector("tbody");

        // Llenar la tabla con los datos
        pedidos.forEach(pedido => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${pedido.producto_id}</td>
                <td>${pedido.pedido_id}</td>
                <td>${pedido.cantidad_solicitada}</td>
                <td>${pedido.cantidad_recibida}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar los pedidos:", error);
        alert("No se pudo cargar el historial de pedidos.");
    }
});