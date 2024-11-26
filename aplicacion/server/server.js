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

    const query = 'SELECT stock_actual, stock_minimo FROM Productos WHERE producto_id = ?';
    connection.query(query, [id_producto], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        } else {
            const { stock_actual, stock_minimo } = results[0];
            res.json({ success: true, stock_actual, stock_minimo });
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
    const { DNI_usuario, DNI_cliente, fecha_venta } = req.body;

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

            // Insertar la venta con un total inicial de 0
            const insertVentaQuery = 'INSERT INTO Ventas (DNI_usuario, DNI_cliente, fecha_venta, total_venta) VALUES (?, ?, ?, 0)';
            connection.query(insertVentaQuery, [DNI_usuario, DNI_cliente, fecha_venta], (err, results) => {
                if (err) {
                    console.error('Error querying database: ', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                const venta_id = results.insertId;

                // Calcular el total de la venta
                const totalVentaQuery = 'SELECT SUM(subtotal) AS total FROM Detalle_Venta WHERE venta_id = ?';
                connection.query(totalVentaQuery, [venta_id], (err, totalResults) => {
                    if (err) {
                        console.error('Error querying database: ', err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    const total_venta = totalResults[0]?.total || 0;

                    // Actualizar el total de la venta
                    const updateVentaQuery = 'UPDATE Ventas SET total_venta = ? WHERE venta_id = ?';
                    connection.query(updateVentaQuery, [total_venta, venta_id], (err) => {
                        if (err) {
                            console.error('Error querying database: ', err);
                            res.status(500).json({ error: 'Internal server error' });
                            return;
                        }

                        res.json({ success: true, message: 'Venta agregada correctamente', total_venta });
                    });
                });
            });
        });
    });
});


app.post('/agregarDetVenta', (req, res) => {
    const { venta_id, producto_id, cantidad_vendida, precio_unitario } = req.body;

    // Verificar que la venta exista
    const checkVentaQuery = 'SELECT * FROM Ventas WHERE venta_id = ?';
    connection.query(checkVentaQuery, [venta_id], (err, ventaResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (ventaResults.length === 0) {
            res.json({ success: false, message: 'La venta no existe en la base de datos' });
            return;
        }

        // Verificar que el producto exista
        const checkProductoQuery = 'SELECT * FROM Productos WHERE producto_id = ?';
        connection.query(checkProductoQuery, [producto_id], (err, productResults) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (productResults.length === 0) {
                res.json({ success: false, message: 'El producto no existe en la base de datos' });
                return;
            }

            if(productResults[0].stock_actual < cantidad_vendida){
                res.json({ success: false, message: 'No hay suficiente stock para realizar la venta' });
                return;
            }else{
                // Insertar el detalle de la venta
                const insertDetVentaQuery = 'CALL AgregarDetalleVenta(?, ?, ?, ?)';
                connection.query(insertDetVentaQuery, [producto_id, venta_id, cantidad_vendida, precio_unitario], (err) => {
                    if (err) {
                        console.error('Error querying database: ', err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    const subtotal = cantidad_vendida * precio_unitario;

                    // Actualizar el total de la venta
                    const updateVentaTotalQuery = 'UPDATE Ventas SET total_venta = total_venta + ? WHERE venta_id = ?';
                    connection.query(updateVentaTotalQuery, [subtotal, venta_id], (err) => {
                        if (err) {
                            console.error('Error updating total venta: ', err);
                            res.status(500).json({ error: 'Internal server error' });
                            return;
                        }

                        // Consultar el stock actual y mínimo
                        const checkStockQuery = 'SELECT stock_actual, stock_minimo FROM Productos WHERE producto_id = ?';
                        connection.query(checkStockQuery, [producto_id], (err, stockResults) => {
                            if (err) {
                                console.error('Error querying stock: ', err);
                                res.status(500).json({ error: 'Internal server error' });
                                return;
                            }

                            const { stock_actual, stock_minimo } = stockResults[0];
                            const isBelowMinimum = stock_actual < stock_minimo;

                            res.json({
                                success: true,
                                message: 'Detalle de venta agregado correctamente y total actualizado.',
                                subtotal,
                                stock_actual,
                                stock_minimo,
                                alert: isBelowMinimum ? 'El stock está por debajo del mínimo. ¡Es necesario reabastecer!' : null,
                            });
                        });
                    });
                });
            }
        });
    });
});


app.post('/totalVenta', (req, res) => {
    const { id } = req.body;

    // Verificar que se proporcione el ID
    if (!id) {
        res.status(400).json({ success: false, message: 'ID de la venta no proporcionado' });
        return;
    }

    // Consultar el total de la venta
    const query = 'SELECT total_venta FROM Ventas WHERE venta_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ success: false, message: 'Venta no encontrada' });
        } else {
            const total_venta = results[0].total_venta;
            res.json({ success: true, total: total_venta });
        }
    });
});



app.post('/agregarPedido', (req, res) => {
    const { proveedor_id, fecha_pedido, estado_pedido } = req.body;

    // Verificar que el proveedor_id exista
    const checkProveedorQuery = 'SELECT * FROM Proveedores WHERE proveedor_id = ?';
    connection.query(checkProveedorQuery, [proveedor_id], (err, proveedorResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return; // Detener la ejecución aquí
        }

        if (proveedorResults.length === 0) {
            res.status(400).json({ success: false, error: 'El proveedor no existe en la base de datos' });
            return; // Detener la ejecución aquí
        }

        // Si el proveedor existe, insertar el pedido
        const query = 'CALL AgregarPedido(?, ?, ?)';
        connection.query(query, [proveedor_id, fecha_pedido, estado_pedido], (err, results) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return; // Detener la ejecución aquí
            }
            res.json({ success: true, message: 'Pedido agregado correctamente' });
        });
    });
});

app.post('/agregarDetPedido', (req, res) => {
    const { producto_id, pedido_id, cantidad_solicitada, cantidad_recibida } = req.body;

    // Verificar que el pedido_id exista
    const checkPedidoQuery = 'SELECT * FROM Pedidos WHERE pedido_id = ?';
    connection.query(checkPedidoQuery, [pedido_id], (err, pedidoResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return; 
        }

        if (pedidoResults.length === 0) {
            res.status(400).json({ success: false, error: 'El pedido no existe en la base de datos' });
            return; 
        }

        // Verificar que el producto_id exista
        const checkProductoQuery = 'SELECT * FROM Productos WHERE producto_id = ?';
        connection.query(checkProductoQuery, [producto_id], (err, productResults) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ success: false, error: 'Internal server error' });
                return; 
            }

            if (productResults.length === 0) {
                res.status(400).json({ success: false, error: 'El producto no existe en la base de datos' });
                return; 
            }

            // Si el producto existe, insertar el detalle del pedido
            const query = 'CALL AgregarDetallePedido(?, ?, ?, ?)';
            connection.query(query, [producto_id, pedido_id, cantidad_solicitada, cantidad_recibida], (err, results) => {
                if (err) {
                    console.error('Error querying database: ', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return; 
                }
                res.json({ success: true, message: 'Detalle de pedido agregado correctamente' });
            });
        });
    });
});

app.get('/pedidos', (req, res) => {
    const query = 'SELECT * FROM detalle_pedido';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.json(results);
    });
});


app.get('/compras', (req, res) => {
    const query = 'SELECT * FROM detalle_compra';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.json(results);
    });
});

app.post('/agregarCompra', (req, res) => {
    const { pedido_id, fecha_compra, monto_total } = req.body;

    // Verificar que el pedido_id exista
    const checkPedidoQuery = 'SELECT * FROM Pedidos WHERE pedido_id = ?';
    connection.query(checkPedidoQuery, [pedido_id], (err, pedidoResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return; 
        }

        if (pedidoResults.length === 0) {
            res.status(400).json({ success: false, error: 'El pedido no existe en la base de datos' });
            return; 
        }

        // Si el pedido existe, insertar la compra
        const query = 'CALL RegistrarCompra(?, ?, ?)';
        connection.query(query, [pedido_id, fecha_compra, monto_total], (err, results) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return; 
            }
            res.json({ success: true, message: 'Compra agregada correctamente' });
        });
    });
});

app.post('/agregarDetCompra', (req, res) => {
    const { producto_id, compra_id, cantidad_comprada, precio_unitario } = req.body;

    // Verificar que el compra_id exista
    const checkCompraQuery = 'SELECT * FROM Compras WHERE compra_id = ?';
    connection.query(checkCompraQuery, [compra_id], (err, compraResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        if (compraResults.length === 0) {
            res.status(400).json({ success: false, error: 'La compra no existe en la base de datos' });
            return;
        }

        // Verificar que el producto_id exista
        const checkProductoQuery = 'SELECT * FROM Productos WHERE producto_id = ?';
        connection.query(checkProductoQuery, [producto_id], (err, productResults) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ success: false, error: 'Internal server error' });
                return;
            }

            if (productResults.length === 0) {
                res.status(400).json({ success: false, error: 'El producto no existe en la base de datos' });
                return;
            }

            // Insertar el detalle de la compra
            const query = 'CALL AgregarDetalleCompra(?, ?, ?, ?)';
            connection.query(query, [producto_id, compra_id, cantidad_comprada, precio_unitario], (err, results) => {
                if (err) {
                    console.error('Error querying database: ', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                // Consultar el stock actual y el stock mínimo después de la compra
                const checkStockQuery = 'SELECT stock_actual, stock_minimo FROM Productos WHERE producto_id = ?';
                connection.query(checkStockQuery, [producto_id], (err, stockResults) => {
                    if (err) {
                        console.error('Error querying database: ', err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    const { stock_actual, stock_minimo } = stockResults[0];
                    const isBelowMinimum = stock_actual < stock_minimo;

                    // Responder al cliente con el stock actual y el mensaje de alerta si es necesario
                    res.json({
                        success: true,
                        message: 'Detalle de compra agregado correctamente',
                        stock_actual,
                        stock_minimo,
                        alert: isBelowMinimum ? 'El stock sigue por debajo del mínimo. ¡Es necesario realizar más compras!' : null,
                    });
                });
            });
        });
    });
});

app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM Clientes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.json(results);
    });
});

app.post('/agregarCliente', (req, res) => {
    const { DNI_cliente, nombre_cliente, tipo_cliente, total_compras } = req.body;

    const checkDNI = 'SELECT * FROM Clientes WHERE DNI_cliente = ?';
    connection.query(checkDNI, [DNI_cliente], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server errr' });
            return; 
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'El cliente ya existe' });
            return; 
        }

        const query = 'INSERT INTO Clientes (DNI_cliente, nombre_cliente, tipo_cliente, total_compras) VALUES (?, ?, ?, ?)';
        connection.query(query, [DNI_cliente, nombre_cliente, tipo_cliente, total_compras], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.json({ success: true });
    });
});
});

app.get('/pagos', (req, res) => {
    const query = 'SELECT * FROM Pagos';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.json(results);
    });
});

app.post('/agregarPago', (req, res) => {
    const { venta_id, monto_pagado, fecha_pago, metodo_pago, estado } = req.body;

    // Verificar que el venta_id exista
    const checkVentaQuery = 'SELECT * FROM Ventas WHERE venta_id = ?';
    connection.query(checkVentaQuery, [venta_id], (err, ventaResults) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        if (ventaResults.length === 0) {
            res.status(400).json({ success: false, error: 'La venta no existe en la base de datos' });
            return;
        }

        // Llamar al procedimiento almacenado para registrar el pago
        const query = 'CALL RegistrarPago(?, ?, ?, ?, ?)';
        connection.query(query, [venta_id, monto_pagado, fecha_pago, metodo_pago, estado], (err, results) => {
            if (err) {
                console.error('Error querying database: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            // Consultar el saldo pendiente después de registrar el pago
            const saldoQuery = 'SELECT saldo_pendiente FROM Pagos WHERE venta_id = ? ORDER BY pago_id DESC LIMIT 1';
            connection.query(saldoQuery, [venta_id], (err, saldoResults) => {
                if (err) {
                    console.error('Error querying database: ', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                const saldo_pendiente = saldoResults[0]?.saldo_pendiente || 0;
                res.json({
                    success: true,
                    message: 'Pago agregado correctamente',
                    saldo_pendiente,
                });
            });
        });
    });
});


app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.json(results);
    });
});

app.post('/agregarUsuario', (req, res) => {
    const { DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, rol, password } = req.body;

    const checkDNI = 'SELECT * FROM Usuarios WHERE DNI_usuario = ?';
    connection.query(checkDNI, [DNI_usuario], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server errr' });
            return; 
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'El usuario ya existe' });
            return; 
        }

        const query = 'INSERT INTO Usuarios (DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, rol, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, rol, password], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.json({ success: true });
    });
});
});

app.post('/registrarUsuario', (req, res) => {
    const { DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, password } = req.body;

    const checkDNI = 'SELECT * FROM Usuarios WHERE DNI_usuario = ?';
    connection.query(checkDNI, [DNI_usuario], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server errr' });
            return; 
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'El usuario ya existe' });
            return; 
        }

        const rol = 'vendedor';

        const query = 'INSERT INTO Usuarios (DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, rol, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, rol, password], (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.json({ success: true });
    });
});
});

app.post('/nombreUsuario', (req, res) => {
    const { DNI_usuario } = req.body;

    const query = 'SELECT primer_nombre, primer_apellido FROM Usuarios WHERE DNI_usuario = ?';
    connection.query(query, [DNI_usuario], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        } else {
            const { primer_nombre, primer_apellido } = results[0];
            res.json({ success: true, nombre: `${primer_nombre} ${primer_apellido}` });
        }
    });
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
