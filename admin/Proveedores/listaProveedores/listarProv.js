document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realizar la solicitud al servidor
        const response = await fetch("http://localhost:4000/proveedores");
        if (!response.ok) throw new Error("Error al obtener los productos");

        // Obtener los datos en formato JSON
        const proveedores = await response.json();

        // Seleccionar la tabla
        const tabla = document.getElementById("tabla-proveedores").querySelector("tbody");

        // Llenar la tabla con los datos
        proveedores.forEach(proveedor => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${proveedor.proveedor_id}</td>
                <td>${proveedor.nombre_proveedor}</td>
                <td>${proveedor.telefono}</td>
                <td>${proveedor.direccion}</td>
                <td>${proveedor.productos_proveedor}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar los proveedores:", error);
        alert("No se pudo cargar los proveedores.");
    }
});