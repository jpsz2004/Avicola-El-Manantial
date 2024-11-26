document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realizar la solicitud al servidor
        const response = await fetch("http://localhost:4000/pagos");
        if (!response.ok) throw new Error("Error al obtener los pagos");

        // Obtener los datos en formato JSON
        const pagos = await response.json();

        // Seleccionar la tabla
        const tabla = document.getElementById("tabla-pagos").querySelector("tbody");

        // Llenar la tabla con los datos
        pagos.forEach(pago => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${pago.venta_id}</td>
                <td>${pago.monto_pagado}</td>
                <td>${pago.fecha_pago}</td>
                <td>${pago.metodo_pago}</td>
                <td>${pago.estado}</td>
                <td>${pago.saldo_pendiente}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar los pagos:", error);
        alert("No se pudo cargar el historial de pagos.");
    }
});