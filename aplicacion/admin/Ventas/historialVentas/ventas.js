document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realizar la solicitud al servidor
        const response = await fetch("http://localhost:4000/ventas");
        if (!response.ok) throw new Error("Error al obtener las ventas");

        // Obtener los datos en formato JSON
        const ventas = await response.json();

        // Seleccionar la tabla
        const tabla = document.getElementById("tabla-ventas").querySelector("tbody");

        // Llenar la tabla con los datos
        ventas.forEach(venta => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${venta.venta_id}</td>
                <td>${venta.producto_id}</td>
                <td>${venta.cantidad_vendida}</td>
                <td>${venta.precio_unitario}</td>
                <td>${venta.subtotal}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar las ventas:", error);
        alert("No se pudo cargar el historial de ventas.");
    }
});