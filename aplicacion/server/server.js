const express = require('express');
const cors = require('cors');
const connection = require('./database');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para inicio de sesión
app.post('/login', (req, res) => {
    const { dni, password } = req.body;

    const query = 'SELECT rol FROM Usuarios WHERE DNI_usuario = ? AND password = ?';
    connection.query(query, [dni, password], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length > 0) {
            // Usuario válido: devolver el rol
            res.json({ success: true, rol: results[0].rol });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    });
});

// Endpoit para agregar un producto (TODO: implementar)
app.post('/agregar', (req, res) => {
    const { nombre, tipo, descripcion, precio, stock_actual, stock_min, unidad_medida } = req.body;

    const query = 'CALL AgregarProducto(?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [nombre, tipo, descripcion, precio, stock_actual, stock_min, unidad_medida], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ success: true });
    });
});

// Endpoint para listar los productos (TODO: implementar)
app.get('/inventario', (req, res) => {
    const query = 'SELECT * FROM Productos';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});


app.post('/eliminarProducto', (req, res) => {
    const { id_producto } = req.body;

    // Primero, verificar si el producto existe en la base de datos
    const checkQuery = 'SELECT * FROM Productos WHERE producto_id = ?';
    connection.query(checkQuery, [id_producto], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            // Producto no encontrado
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        // Producto encontrado, proceder con la eliminación
        const deleteQuery = 'DELETE FROM Productos WHERE producto_id = ?';
        connection.query(deleteQuery, [id_producto], (err, results) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json({ success: true, message: 'Producto eliminado correctamente' });
        });
    });
});

// Obtener un producto
app.post('/obtenerProducto', (req, res) => {
    const { id_producto } = req.body;

    // Consulta para buscar el producto en la base de datos
    const query = 'SELECT * FROM Productos WHERE producto_id = ?';
    connection.query(query, [id_producto], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos: ', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        if (results.length === 0) {
            // Producto no encontrado
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        } else {
            // Producto encontrado, devolver los datos
            res.json({ success: true, producto: results[0] });
        }
    });
});


app.post('/modificarProducto', (req, res) => {
    const { id_producto, nombre, tipo, descripcion, precio, stock_actual, stock_min, unidad_medida } = req.body;

    const query = 'UPDATE Productos SET nombre_producto = ?, tipo_producto = ?, descripcion = ?, precio_venta = ?, stock_actual = ?, stock_minimo = ?, unidad_medida = ? WHERE producto_id = ?';
    connection.query(query, [ nombre, tipo, descripcion, precio, stock_actual, stock_min, unidad_medida, id_producto], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ success: true, message: 'Producto modificado correctamente' });
    });
});


app.post('/consultarStock', (req, res) => {
    const { id_producto } = req.body;

    if (!id_producto) {
        res.status(400).json({ success: false, message: 'ID del producto no proporcionado' });
        return;
    }

    const query = 'CALL VerStockActual(?)';
    connection.query(query, [id_producto], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        } else {
            res.json({ success: true, stock_actual: results[0].stock_actual });
        }
    });
});

app.post('/agregarProveedor', (req, res) => {
    const { nombre, telefono, direccion, productos } = req.body;

    const query = 'CALL AgregarProveedor(?, ?, ?, ?)';
    connection.query(query, [nombre, telefono, direccion, productos], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ success: true });
    });
});

app.get('/proveedores', (req, res) => {
    const query = 'SELECT * FROM Proveedores';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

app.get('/ventas', (req, res) => {
    const query = 'SELECT * FROM detalle_venta';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

app.post('/agregarVenta', (req, res) => {
    const { DNI_usuario, DNI_cliente, fecha_venta, total_venta } = req.body;

    // Verificar que el DNI_usuario exista
    const checkUsuarioQuery = 'SELECT * FROM Usuarios WHERE DNI_usuario = ?';
    connection.query(checkUsuarioQuery, [DNI_usuario], (err, userResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (userResults.length === 0) {
            res.status(400).json({ error: 'El usuario no existe en la base de datos' });
            return;
        }

        // Verificar que el DNI_cliente exista
        const checkClienteQuery = 'SELECT * FROM Clientes WHERE DNI_cliente = ?';
        connection.query(checkClienteQuery, [DNI_cliente], (err, clientResults) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (clientResults.length === 0) {
                res.status(400).json({ error: 'El cliente no existe en la base de datos' });
                return;
            }

            // Insertar la venta
            const insertVentaQuery = 'INSERT INTO Ventas (DNI_usuario, DNI_cliente, fecha_venta, total_venta) VALUES (?, ?, ?, ?)';
            connection.query(insertVentaQuery, [DNI_usuario, DNI_cliente, fecha_venta, total_venta], (err, results) => {
                if (err) {
                    console.error('Error querying database: ', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.json({ success: true, message: 'Venta agregada correctamente' });
            });
        });
    });
});

app.post('/agregarDetVenta', (req, res) => {
    const { venta_id, producto_id, cantidad_vendida, precio_unitario } = req.body;

    // Verificar que el id_venta exista
    const checkVentaQuery = 'SELECT * FROM Ventas WHERE venta_id = ?';
    connection.query(checkVentaQuery, [venta_id], (err, ventaResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (ventaResults.length === 0) {
            res.status(400).json({ error: 'La venta no existe en la base de datos' });
            return;
        }

        // Verificar que el id_producto exista
        const checkProductoQuery = 'SELECT * FROM Productos WHERE producto_id = ?';
        connection.query(checkProductoQuery, [producto_id], (err, productResults) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (productResults.length === 0) {
                res.status(400).json({ error: 'El producto no existe en la base de datos' });
                return;
            }

            // Insertar el detalle de la venta
            const insertDetVentaQuery = 'CALL AgregarDetalleVenta(?, ?, ?, ?)';
            connection.query(insertDetVentaQuery, [producto_id, venta_id, cantidad_vendida, precio_unitario], (err, results) => {
                if (err) {
                    console.error('Error querying database: ', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                const subtotal = cantidad_vendida * precio_unitario; // Extraer el subtotal del resultado
                res.json({ success: true, message: 'Detalle de venta agregado correctamente', subtotal });
            });
        });
    });
});

app.post('/agregarPedido' , (req, res) => {
    const { proveedor_id, fecha_pedido, estado_pedido } = req.body;

    // Verificar que el proveedor_id exista
    const checkProveedorQuery = 'SELECT * FROM Proveedores WHERE proveedor_id = ?';
    connection.query(checkProveedorQuery, [proveedor_id], (err, proveedorResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        if (proveedorResults.length === 0) {
            res.status(400).json({ success: false, error: 'El proveedor no existe en la base de datos' });
            return;
        }

    });

    const query = 'CALL AgregarPedido(?, ?, ?)';
    connection.query(query, [proveedor_id, fecha_pedido, estado_pedido], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ success: true });
    });
});






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
