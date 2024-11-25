const volver = document.getElementById("btn-volver");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realizar la solicitud al servidor
        const response = await fetch("http://localhost:4000/inventario");
        if (!response.ok) throw new Error("Error al obtener los productos");

        // Obtener los datos en formato JSON
        const productos = await response.json();

        // Seleccionar la tabla
        const tabla = document.getElementById("tabla-productos").querySelector("tbody");

        // Llenar la tabla con los datos
        productos.forEach(producto => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.producto_id}</td>
                <td>${producto.nombre_producto}</td>
                <td>${producto.precio_venta}</td>
                <td>${producto.stock_actual}</td>
                <td>${producto.stock_minimo}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        alert("No se pudo cargaaaar el inventario.");
    }
});

volver.addEventListener("click", async event => {
    event.preventDefault();
    window.location.href = "../admin.html";
});


