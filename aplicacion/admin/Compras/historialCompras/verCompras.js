document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realizar la solicitud al servidor
        const response = await fetch("http://localhost:4000/compras");
        if (!response.ok) throw new Error("Error al obtener las compras");

        // Obtener los datos en formato JSON
        const compras = await response.json();

        // Seleccionar la tabla
        const tabla = document.getElementById("tabla-compras").querySelector("tbody");

        // Llenar la tabla con los datos
        compras.forEach(compra => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${compra.producto_id}</td>
                <td>${compra.compra_id}</td>
                <td>${compra.cantidad_comprada}</td>
                <td>${compra.precio_unitario}</td>
                <td>${compra.subtotal}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar las compras:", error);
        alert("No se pudo cargar el historial de compras.");
    }
});