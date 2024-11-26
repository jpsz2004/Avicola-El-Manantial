-- Consulta para crear la base de datos en PHPMyAdmin
CREATE DATABASE IF NOT EXISTS AvicolaElManantial;

USE AvicolaElManantial;

-- Tabla de Proveedores
CREATE TABLE Proveedores (
    proveedor_id INT AUTO_INCREMENT PRIMARY KEY ,
    nombre_proveedor VARCHAR(100),
    telefono VARCHAR(15),
    direccion VARCHAR(150),
    productos_proveedor TEXT
);


-- Tabla de Productos
CREATE TABLE Productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100),
    tipo_producto VARCHAR(50),
    descripcion TEXT,
    precio_venta DECIMAL(10, 2),
    stock_actual INT,
    stock_minimo INT,
    unidad_medida VARCHAR(20)
);


-- Tabla de Pedidos
CREATE TABLE Pedidos (
    pedido_id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT,
    fecha_pedido DATETIME,
    estado_pedido VARCHAR(20),
    FOREIGN KEY (proveedor_id) REFERENCES Proveedores(proveedor_id)
);


-- Tabla de Detalle_Pedido
CREATE TABLE Detalle_Pedido (
    id_detalleP INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    pedido_id INT,
    cantidad_solicitada INT,
    cantidad_recibida INT,
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id)
);


-- Tabla de Compras
CREATE TABLE Compras (
    compra_id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT, 
    fecha_compra DATE,
    monto_total DECIMAL(10, 2),
    UNIQUE (pedido_id), -- Para garantizar la relacion 1 a 1
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id)
);


-- Tabla de Detalle_Compra
CREATE TABLE Detalle_Compra (
    id_detalleC INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    compra_id INT,
    cantidad_comprada INT,
    precio_unitario DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    FOREIGN KEY (compra_id) REFERENCES Compras(compra_id)
);


-- Tabla de Clientes
CREATE TABLE Clientes (
    DNI_cliente VARCHAR(10) PRIMARY KEY,
    nombre_cliente VARCHAR(100),
    tipo_cliente VARCHAR(20),
    total_compras INT
);


-- Tabla de Descuentos
CREATE TABLE Descuentos (
    descuento_id INT AUTO_INCREMENT PRIMARY KEY,
    DNI_cliente VARCHAR(10),
    porcentaje_dcto DECIMAL(5, 2),
    descripcion VARCHAR(255),
    FOREIGN KEY (DNI_cliente) REFERENCES Clientes(DNI_cliente)
);


-- Tabla de Usuarios
CREATE TABLE Usuarios (
    DNI_usuario VARCHAR(10) PRIMARY KEY,
    primer_nombre VARCHAR(50),
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50),
    segundo_apellido VARCHAR(50),
    telefono VARCHAR(15),
    rol VARCHAR(20),
    password VARCHAR(255)
);


-- Tabla de Ventas
CREATE TABLE Ventas (
    venta_id INT AUTO_INCREMENT PRIMARY KEY,
    DNI_usuario VARCHAR(10),
    DNI_cliente VARCHAR(10),
    fecha_venta DATETIME,
    total_venta DECIMAL(10, 2),
    FOREIGN KEY (DNI_usuario) REFERENCES Usuarios(DNI_usuario),
    FOREIGN KEY (DNI_cliente) REFERENCES Clientes(DNI_cliente)
);


--  Tabla de Detalle_Venta
CREATE TABLE Detalle_Venta (
    id_detalleV INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    venta_id INT,
    cantidad_vendida INT,
    precio_unitario DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    FOREIGN KEY (venta_id) REFERENCES Ventas(venta_id)
);


-- Tabla de Pagos
CREATE TABLE Pagos (
    pago_id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT, 
    monto_pagado DECIMAL(10, 2),
    fecha_pago DATE,
    metodo_pago VARCHAR(20),
    estado VARCHAR(20),
    saldo_pendiente DECIMAL(10, 2),
    UNIQUE (venta_id), -- Para garantizar la relacion 1 a 1
    FOREIGN KEY (venta_id) REFERENCES Ventas(venta_id)
);

-- INSERCIÓN DE DATOS ESTÁTICOS Y DE EJEMPLO PARA PRUEBAS

-- Proveedores
INSERT INTO Proveedores (nombre_proveedor, telefono, direccion, productos_proveedor) VALUES 
('granja villa ines', '3145893245', 'galeria la 40', 'huevos'),
('distribuidora del rio', '3154768534', 'avenida del rio', 'huevos, azucar'),
('distribuidora alvarez', '3125467238', 'calle 10', 'panela, arroz, vasos desechables'),
('tropper', '3154789654', 'calle 20', 'mirringo, ringo, sal'),
('colanta', '3203451278', 'calle 30', 'leche'),
('alqueria', '3126785498', 'calle 32', 'leche, crema de leche'),
('aceite ideal', '3458761234', 'calle 34', 'aceite, electrolit, atun'),
('escobas y traperos la 9a', '3145872390', 'cra 9', 'escobas, trapeadores, recogedores'),
('el globo', '3126785463', 'cra 15', 'lentejas, frijoles, espaguetis, mantequilla, chocolate, cafe, papel higienico, fruco, candelas, panelada, maizena, esponjas'),
('el granjero', '3125647389', 'calle 35', 'microfibra, fibra'),
('el confite', '3153785654', 'calle 54', 'bocadillos, jabon');

-- Productos
INSERT INTO Productos (nombre_producto, tipo_producto, descripcion, precio_venta, stock_actual, stock_minimo, unidad_medida) VALUES 
('huevo super blanco', 'alimento', 'huevos de gallina por unidad', 700.00, 877, 600, 'unidad'),
('panal de huevo super blanco', 'alimento', 'huevos de gallina por 30 unidades', 18000.00, 29, 20, 'panal'),
('huevo aa blanco', 'alimento', 'huevos de gallina por unidad', 600.00, 3302, 600, 'unidad'),
('panal de huevo aa blanco', 'alimento', 'huevos de gallina por 30 unidades', 15000.00, 110, 20, 'panal'),
('huevo a blanco', 'alimento', 'huevos de gallina por unidad', 500.00, 1017, 600, 'unidad'),
('panal de huevo a blanco', 'alimento', 'huevos de gallina por 30 unidades', 14000.00, 33, 20, 'panal'),
('huevo b blanco', 'alimento', 'huevos de gallina por unidad', 500.00, 120.00, 300, 'unidad'),
('panal de huevo b blanco', 'alimento', 'huevos de gallina por 30 unidades', 13000.00, 4, 10, 'panal'),
('huevo b rojo', 'alimento', 'huevos de gallina por unidad', 500.00, 375, 300, 'unidad'),
('panal de huevo b rojo', 'alimento', 'huevos de gallina por 30 unidades', 13000.00, 12, 10, 'panal'),
('azucar', 'alimento', 'azucar blanca', 2800.00, 22, 10, 'libras'),
('panela trebol cono', 'alimento', 'panela de cana', 6600.00, 42, 15, 'atao'),
('panela trebol kilera', 'alimento', 'panela de cana', 6300.00, 20, 15, 'kilo'),
('panela supia', 'alimento', 'panela de cana', 5500.00, 24, 15, 'kilo'),
('arroz roa', 'alimento', 'arroz blanco', 2400.00, 140, 25, 'libra'),
('paquete vasos desechables', 'desechables', 'vasos desechables', 2000.00, 2, 1, 'paquete'),
('mirringo', 'alimento para mascotas', 'concentrado para perros', 5600.00, 4, 2, 'paquete'),
('ringo', 'alimento para mascotas', 'concentrado para gatos', 5600.00, 8, 4, 'paquete'),
('sal', 'alimento', 'sal de mesa', 1300.00, 6, 5, 'libras'),
('leche montefrio', 'alimento', 'leche entera coalanta', 3800, 131, 54, 'bolsa'),
('leche entera alqueria', 'alimento', 'leche entera alqueria', 6000.00, 5, 10, 'bolsa'),
('leche alqueria economica', 'alimento', 'leche entera alqueria', 4800.00, 2, 10, 'bolsa'),
('leche alqueria personal', 'alimento', 'leche entera alqueria', 1000.00, 13, 5, 'bolsa'),
('crema de leche 125 ml', 'alimento', 'crema de leche', 3200.00, 2, 4, 'unidad'),
('crema de leche 180 ml', 'alimento', 'crema de leche', 5400.00, 4, 4, 'unidad'),
('aceite 250 ml', 'alimento', 'aceite de cocina', 2000.00, 23, 10, 'botella'),
('aceite 500 ml', 'alimento', 'aceite de cocina', 3800.00, 22, 10, 'botella'),
('aceite 1000 ml', 'alimento', 'aceite de cocina', 7400.00, 22, 10, 'botella'),
('aceite 2000 ml', 'alimento', 'aceite de cocina', 15300.00, 12, 5, 'botella'),
('aceite 3000 ml', 'alimento', 'aceite de cocina', 23000.00, 12, 4, 'botella'),
('electrolit', 'bebida', 'bebida hidratante', 7800.00, 2, 5, 'botella'),
('atun', 'alimento', 'atun enlatado', 3700.00, 40, 15, 'unidad'),
('escoba', 'limpieza', 'escobas', 7200.00, 3, 3, 'unidad'),
('trapeador xl', 'limpieza', 'trapeadores', 8700.00, 1, 3, 'unidad'),
('trapeador de microfibra', 'limpieza', 'trapeadores', 11400.00, 3, 3, 'unidad'),
('recogedor', 'limpieza', 'recogedores de plastico', 4800.00, 4, 3, 'unidad'),
('lenteja', 'alimento', 'lentejas', 4000.00, 3, 5, 'libra'),
('frijol', 'alimento', 'frijoles', 5800.00, 5, 5, 'libra'),
('espaguetis', 'alimento', 'espaguetis', 2000.00, 2, 5, 'paquete'),
('mantequilla la buena', 'alimento', 'mantequilla', 3000, 8, 5, 'unidad'),
('chocolate luker', 'alimento', 'chocolate', 1000.00, 27, 10, 'pastilla'),
('nescafe 10g', 'alimento', 'cafe', 1600.00, 10, 5, 'sobre'),
('papel higienico', 'aseo', 'papel higienico', 3000, 0, 10, 'rollo'),
('fruco', 'alimento', 'fruco', 3200.00, 8, 5, 'sobre'),
('candela tokai', 'alimento', 'candelas', 1500.00, 28, 10, 'unidad'),
('panelada', 'alimento', 'panelada', 1500.00, 5, 10, 'caja'),
('maizena', 'alimento', 'maizena', 4300.00, 4, 5, 'caja'),
('esponja', 'aseo', 'esponjas', 600.00, 2, 10, 'unidad'),
('fibra', 'herramienta', 'fibra para amarrar o sujetar', 18000.00, 3, 3, 'rollo'),
('bocadillo', 'alimento', 'bocadillos', 700.00, 53, 15, 'unidad'),
('jabon protex', 'aseo', 'jabon', 3800.00, 4, 5, 'unidades'),
('maggi', 'alimento', 'sazonador', 600.00, 64, 20, 'cubo');

-- Pedidos (Lo actualiza el usuario cuando realice un pedido real) (pendiente, completado, cancelado)
INSERT INTO Pedidos (proveedor_id, fecha_pedido, estado_pedido) VALUES 
(1, '2024-11-07 08:30:21', 'pendiente'),
(2, '2024-11-07 08:31:21', 'pendiente'),
(3, '2024-11-07 08:32:21', 'pendiente'),
(4, '2024-11-07 08:33:21', 'pendiente'),
(5, '2024-11-07 08:34:21', 'pendiente'),
(6, '2024-11-07 08:35:21', 'pendiente'),
(7, '2024-11-07 08:36:21', 'pendiente'),
(8, '2024-11-07 08:37:21', 'pendiente'),
(9, '2024-11-07 08:38:21', 'pendiente'),
(10, '2024-11-07 08:39:21', 'pendiente'),
(11, '2024-11-07 08:40:21', 'pendiente');

-- Detalle_Pedido (Lo actualiza el usuario cuando realice un pedido real)
INSERT INTO Detalle_Pedido (producto_id, pedido_id, cantidad_solicitada, cantidad_recibida) VALUES 
(1, 1, 100, 0),
(2, 1, 10, 0),
(3, 2, 100, 0),
(4, 2, 10, 0),
(5, 3, 100, 0),
(6, 3, 10, 0),
(7, 4, 100, 0),
(8, 4, 10, 0),
(9, 5, 100, 0),
(10, 5, 10, 0),
(11, 6, 100, 0),
(12, 6, 10, 0),
(13, 7, 100, 0),
(14, 7, 10, 0),
(15, 8, 100, 0),
(16, 8, 10, 0),
(17, 9, 100, 0),
(18, 9, 10, 0),
(19, 10, 100, 0),
(20, 10, 10, 0),
(21, 11, 100, 0),
(22, 11, 10, 0);

-- Compras (Lo actualiza el usuario cuando realice una compra real)
INSERT INTO Compras (pedido_id, fecha_compra, monto_total) VALUES 
(1, '2024-11-07', 0),
(2, '2024-11-07', 0),
(3, '2024-11-07', 0),
(4, '2024-11-07', 0),
(5, '2024-11-07', 0),
(6, '2024-11-07', 0),
(7, '2024-11-07', 0),
(8, '2024-11-07', 0),
(9, '2024-11-07', 0),
(10, '2024-11-07', 0),
(11, '2024-11-07', 0);

-- Detalle_Compra (Lo actualiza el usuario cuando realice una compra real) El subtotal es cero ya que aun no se han registrado las cantidades compradas ya que los pedidos estan pendientes
INSERT INTO Detalle_Compra (producto_id, compra_id, cantidad_comprada, precio_unitario, subtotal) VALUES 
(1, 1, 0, 530.00, 0),
(2, 1, 0, 15900.00, 0),
(3, 2, 0, 440.00, 0),
(4, 2, 0, 13200.00, 0),
(5, 3, 0, 400.00, 0),
(6, 3, 0, 12000.00, 0),
(7, 4, 0, 370.00, 0),
(8, 4, 0, 11100.00, 0),
(9, 5, 0, 350.00, 0),
(10, 5, 0, 10500.00, 0),
(11, 6, 0, 2300.00, 0),
(12, 6, 0, 5500.00, 0),
(13, 7, 0, 5250.00, 0),
(14, 7, 0, 4600.00, 0),
(15, 8, 0, 2000.00, 0),
(16, 8, 0, 2000.00, 0),
(17, 9, 0, 4700.00, 0),
(18, 9, 0, 4700.00, 0),
(19, 10, 0, 1070.00, 0),
(20, 10, 0, 3170.00,0),
(21, 11, 0, 5000.00, 0),
(22, 11, 0, 4000.00, 0);

-- Clientes (El usuario debe registrar los clientes)
INSERT INTO Clientes (DNI_cliente, nombre_cliente, tipo_cliente, total_compras) VALUES 
('1055357609', 'juan perez', 'particular', 0),
('1088394820', 'maria rodriguez', 'regular', 0),
('1085323883', 'juan carlos', 'nuevo', 0),
('9876543210', 'tienda juanchito', 'particular', 0),
('1234567891', 'samuel rios', 'particular', 0),
('9876543211', 'kamila', 'regular', 0),
('1234567892', 'la coste', 'nuevo', 0),
('9876543212', 'colibri', 'particular', 0),
('1234567893', 'lina gallego', 'regular', 0),
('9876543213', 'saul baron', 'regular', 0);

-- Descuentos (El usuario debe registrar los descuentos)
INSERT INTO Descuentos (DNI_cliente, porcentaje_dcto, descripcion) VALUES 
('1055357609', 0.00, 'descuento por ser cliente particular'),
('1088394820', 0.10, 'descuento por ser cliente regular'),
('1085323883', 0.15, 'descuento por ser cliente nuevo'),
('9876543210', 0.00, 'descuento por ser cliente particular'),
('1234567891', 0.00, 'descuento por ser cliente particular'),
('9876543211', 0.10, 'descuento por ser cliente regular'),
('1234567892', 0.15, 'descuento por ser cliente nuevo'),
('9876543212', 0.00, 'descuento por ser cliente particular'),
('1234567893', 0.10, 'descuento por ser cliente regular'),
('9876543213', 0.10, 'descuento por ser cliente regular');

-- Usuarios

INSERT INTO Usuarios (DNI_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, rol, password) VALUES 
('1234567890', 'janneth', '', 'zapata', 'mejia', '3145893245', 'administrador', '123456'),
('1234567891', 'oswaldo', '', 'sanchez', 'moreno', '3154768534', 'administrador', '654321'),
('1234567892', 'juan', 'pablo', 'sanchez', 'zapata', '3125467238', 'vendedor', '987654');

-- Ventas (Lo actualiza el usuario cuando realice una venta real)
-- El total de venta se actualiza automaticamente con la suma de los subtotales de los productos vendidos
INSERT INTO Ventas (DNI_usuario, DNI_cliente, fecha_venta, total_venta) VALUES 
('1234567890', '1055357609', '2024-11-07 08:30:21', 0),
('1234567891', '1088394820', '2024-11-07 08:31:21', 0),
('1234567892', '1085323883', '2024-11-07 08:32:21', 0),
('1234567890', '9876543210', '2024-11-07 08:33:21', 0),
('1234567891', '1234567891', '2024-11-07 08:34:21', 0),
('1234567892', '9876543211', '2024-11-07 08:35:21', 0),
('1234567890', '1234567892', '2024-11-07 08:36:21', 0),
('1234567891', '9876543212', '2024-11-07 08:37:21', 0),
('1234567892', '1234567893', '2024-11-07 08:38:21', 0),
('1234567890', '9876543213', '2024-11-07 08:39:21', 0);

-- Detalle_Venta El precio unitario se extrae del precio de venta en la tabla de productos. Por el momento estos datos son ficiticios. El usuario debe actualizarlos cuando realice una venta real.
-- El subtotal se generará automaticamente con la cantidad vendida y el precio unitario
INSERT INTO Detalle_Venta (producto_id, venta_id, cantidad_vendida, precio_unitario, subtotal) VALUES 
(1, 1, 100, 700.00, 0),
(2, 1, 10, 18000.00, 0),
(3, 2, 100, 600.00, 0),
(4, 2, 10, 15000.00, 0),
(5, 3, 100, 500.00, 0),
(6, 3, 10, 14000.00, 0),
(7, 4, 100, 500.00, 0),
(8, 4, 10, 13000.00, 0),
(9, 5, 100, 500.00, 0),
(10, 5, 10, 13000.00, 0),
(11, 6, 100, 2800.00, 0);

-- Pagos (Lo actualiza el usuario cuando realice un pago real)
INSERT INTO Pagos (venta_id, monto_pagado, fecha_pago, metodo_pago, estado, saldo_pendiente) VALUES 
(1, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(2, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(3, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(4, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(5, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(6, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(7, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(8, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(9, 0, '2024-11-07', 'efectivo', 'pendiente', 0),
(10, 0, '2024-11-07', 'efectivo', 'pendiente', 0);

-- PROCEDIMIENTOS 


-- GESTION DE INVENTARIO

DELIMITER //

-- Procedimiento para agregar un producto nuevo al inventario
CREATE PROCEDURE AgregarProducto(
    IN nombre_producto VARCHAR(100),
    IN tipo_producto VARCHAR(50),
    IN descripcion TEXT,
    IN precio_venta DECIMAL(10, 2),
    IN stock_actual INT,
    IN stock_minimo INT,
    IN unidad_medida VARCHAR(20)
)
BEGIN
    INSERT INTO Productos (nombre_producto, tipo_producto, descripcion, precio_venta, stock_actual, stock_minimo, unidad_medida) 
    VALUES (nombre_producto, tipo_producto, descripcion, precio_venta, stock_actual, stock_minimo, unidad_medida);
END //

-- Procedimiento para actualizar el nombre de un producto
CREATE PROCEDURE ActualizarNombreProducto(
    IN producto_id INT,
    IN nuevo_nombre VARCHAR(100)
)
BEGIN
    UPDATE Productos SET nombre_producto = nuevo_nombre WHERE producto_id = producto_id;
END //

-- Procedimiento para visualizar el stock atual de un producto
CREATE PROCEDURE VerStockActual(
    IN producto_id INT
)
BEGIN
    SELECT stock_actual FROM Productos WHERE producto_id = producto_id;
END //

-- Procedimiento para visualizar el stock minimo de un producto
CREATE PROCEDURE VerStockMinimo(
    IN producto_id INT
)
BEGIN
    SELECT stock_minimo FROM Productos WHERE producto_id = producto_id;
END //

-- Procedimiento para modificar el stock minimo de un producto
CREATE PROCEDURE ActualizarStockMinimo(
    IN producto_id INT,
    IN nuevo_stock_minimo INT
)
BEGIN
    UPDATE Productos SET stock_minimo = nuevo_stock_minimo WHERE producto_id = producto_id;
END //

-- Procedimiento para actualizar el precio de venta de un producto
CREATE PROCEDURE ActualizarPrecioVenta(
    IN producto_id INT,
    IN precio_venta DECIMAL(10, 2)
)
BEGIN
    UPDATE Productos SET precio_venta = precio_venta WHERE producto_id = producto_id;
END //

-- Procedimiento para visualizar el precio de venta de un producto
CREATE PROCEDURE VerPrecioVenta(
    IN producto_id INT
)
BEGIN
    SELECT precio_venta FROM Productos WHERE producto_id = producto_id;
END //

-- Procedimiento para actualizar el precio de compra de un producto
CREATE PROCEDURE ActualizarPrecioCompra(
    IN producto_id INT,
    IN precio_compra_unitario DECIMAL(10, 2)
)
BEGIN
    UPDATE Detalle_Compra SET precio_unitario = precio_compra_unitario WHERE producto_id = producto_id;
END //

-- Procedimiento para visualizar el precio de compra de un producto
CREATE PROCEDURE VerPrecioCompra(
    IN producto_id INT
)
BEGIN
    SELECT precio_unitario FROM Detalle_Compra WHERE producto_id = producto_id;
END //

-- Procedimiento para actualizar el stock actual de un producto automaticamente despues de una venta
CREATE PROCEDURE ActualizarStock(
    IN producto_id INT,
    IN cantidad_vendida INT
)
BEGIN
    UPDATE Productos SET stock_actual = stock_actual - cantidad_vendida WHERE producto_id = producto_id;
END //


-- GESTION DE VENTAS

-- Procedimiento para registrar una venta
CREATE PROCEDURE RegistrarVenta(
    IN DNI_usuario VARCHAR(10),
    IN DNI_cliente VARCHAR(10),
    IN fecha_venta DATETIME,
    IN total_venta DECIMAL(10, 2)
)
BEGIN
    INSERT INTO Ventas (DNI_usuario, DNI_cliente, fecha_venta, total_venta) 
    VALUES (DNI_usuario, DNI_cliente, fecha_venta, total_venta);
END //

-- Procedimiento para agregar un detalle de venta
CREATE PROCEDURE AgregarDetalleVenta(
    IN producto_id INT,
    IN venta_id INT,
    IN cantidad_vendida INT,
    IN precio_unitario DECIMAL(10, 2)
)
BEGIN
    DECLARE subtotal DECIMAL(10, 2);
    SET subtotal = cantidad_vendida * precio_unitario;
    INSERT INTO Detalle_Venta (producto_id, venta_id, cantidad_vendida, precio_unitario, subtotal)
    VALUES (producto_id, venta_id, cantidad_vendida, precio_unitario, subtotal);
END //

-- Procedimiento para calcular el total de una venta
CREATE PROCEDURE CalcularTotalVenta(
    IN venta_id INT
)
BEGIN
    DECLARE total DECIMAL(10, 2);
    SET total = (SELECT SUM(subtotal) FROM Detalle_Venta WHERE venta_id = venta_id);
    UPDATE Ventas SET total_venta = total WHERE venta_id = venta_id;
END //

-- Procedimiento para aplicar un descuento
CREATE PROCEDURE AplicarDescuento(
    IN DNI_cliente VARCHAR(10),
    IN venta_id INT
)
BEGIN
    DECLARE descuento DECIMAL(5, 2);
    DECLARE total DECIMAL(10, 2);

    -- Se debe buscar el porcentaje de descuento del cliente
    SELECT porcentaje_dcto INTO descuento FROM Descuentos
    WHERE DNI_cliente = DNI_cliente;

    -- Se aplica el descuento al total si existe
    IF descuento IS NOT NULL OR descuento > 0 THEN
        SELECT total_venta INTO total FROM Ventas
        WHERE venta_id = venta_id;

        -- Se aplica el descuento
        SET total = total - (total * descuento);

        -- Se actualiza el total de la venta
        UPDATE Ventas SET total_venta = total WHERE venta_id = venta_id;
    END IF;
END //


-- GESTION DE PROVEEDORES y PEDIDOS

-- Procedimiento para agregar un proveedor
CREATE PROCEDURE AgregarProveedor(
    IN nombre_proveedor VARCHAR(100),
    IN telefono VARCHAR(15),
    IN direccion VARCHAR(150),
    IN productos_proveedor TEXT
)
BEGIN
    INSERT INTO Proveedores (nombre_proveedor, telefono, direccion, productos_proveedor)
    VALUES (nombre_proveedor, telefono, direccion, productos_proveedor);
END //

-- Procedimiento para agregar un pedido
CREATE PROCEDURE AgregarPedido(
    IN proveedor_id INT,
    IN fecha_pedido DATETIME,
    IN estado_pedido VARCHAR(20)
)
BEGIN
    INSERT INTO Pedidos (proveedor_id, fecha_pedido, estado_pedido)
    VALUES (proveedor_id, fecha_pedido, estado_pedido);
END //

-- Procedimiento para agregar un detalle de pedido
CREATE PROCEDURE AgregarDetallePedido(
    IN producto_id INT,
    IN pedido_id INT,
    IN cantidad_solicitada INT,
    IN cantidad_recibida INT
)
BEGIN
    INSERT INTO Detalle_Pedido (producto_id, pedido_id, cantidad_solicitada, cantidad_recibida)
    VALUES (producto_id, pedido_id, cantidad_solicitada, cantidad_recibida);
END //

-- GESTION DE COMPRAS

-- Procedimiento para registrar una compra
CREATE PROCEDURE RegistrarCompra(
    IN pedido_id INT,
    IN fecha_compra DATE,
    IN monto_total DECIMAL(10, 2)
)
BEGIN
    INSERT INTO Compras (pedido_id, fecha_compra, monto_total)
    VALUES (pedido_id, fecha_compra, monto_total);
END //

-- Procedimiento para agregar un detalle de compra
CREATE PROCEDURE AgregarDetalleCompra(
    IN producto_id INT,
    IN compra_id INT,
    IN cantidad_comprada INT,
    IN precio_unitario DECIMAL(10, 2)
)
BEGIN
    DECLARE subtotal DECIMAL(10, 2);
    SET subtotal = cantidad_comprada * precio_unitario;
    INSERT INTO Detalle_Compra (producto_id, compra_id, cantidad_comprada, precio_unitario, subtotal)
    VALUES (producto_id, compra_id, cantidad_comprada, precio_unitario, subtotal);
END //

-- Procedimiento para actualizar stock actual de un producto despues de una compra (Pedido completado)
CREATE PROCEDURE ActualizarStockCompra(
    IN producto_id INT,
    IN cantidad_comprada INT
)
BEGIN
    UPDATE Productos SET stock_actual = stock_actual + cantidad_comprada WHERE producto_id = producto_id;
END //

-- Procedimiento para obtener el monto total de una compra
CREATE PROCEDURE CalcularTotalCompra(
    IN compra_id INT
)
BEGIN
    DECLARE total DECIMAL(10, 2);
    SET total = (SELECT SUM(subtotal) FROM Detalle_Compra WHERE compra_id = compra_id);
    UPDATE Compras SET monto_total = total WHERE compra_id = compra_id;
END //

-- Procedimiento para obtener discrepancias en las cantidades solicitadas y recibidas
CREATE PROCEDURE VerificarDiscrepancias(
    IN pedido_id INT
)
BEGIN
    SELECT * FROM Detalle_Pedido WHERE pedido_id = pedido_id AND cantidad_solicitada != cantidad_recibida;
END //


-- GESTION DE PAGOS

-- Procedimiento para registrar un pago
CREATE PROCEDURE RegistrarPago(
    IN venta_id INT,
    IN monto_pagado DECIMAL(10, 2),
    IN fecha_pago DATE,
    IN metodo_pago VARCHAR(20),
    IN estado VARCHAR(20)
)
BEGIN
    DECLARE saldo DECIMAL(10, 2);
    SET saldo = (SELECT total_venta FROM Ventas WHERE venta_id = venta_id) - monto_pagado;
    INSERT INTO Pagos (venta_id, monto_pagado, fecha_pago, metodo_pago, estado, saldo_pendiente)
    VALUES (venta_id, monto_pagado, fecha_pago, metodo_pago, estado, saldo);
END //

-- Procedimiento para actualizar el estado de un pago
CREATE PROCEDURE ActualizarEstadoPago(
    IN venta_id INT,
    IN nuevo_estado VARCHAR(20)
)
BEGIN
    UPDATE Pagos SET estado = nuevo_estado WHERE venta_id = venta_id;
END //

-- Procedimiento para visualizar el estado de un pago
CREATE PROCEDURE VerEstadoPago(
    IN venta_id INT
)
BEGIN
    SELECT estado FROM Pagos WHERE venta_id = venta_id;
END //

-- Procedimiento para visualizar el saldo pendiente de un pago
CREATE PROCEDURE VerSaldoPendiente(
    IN venta_id INT
)
BEGIN
    SELECT saldo_pendiente FROM Pagos WHERE venta_id = venta_id;
END //

-- Procedimiento para actualizar el saldo pendiente de un pago
CREATE PROCEDURE ActualizarSaldoPendiente(
    IN venta_id INT,
    IN abono DECIMAL(10, 2)
)
BEGIN
    UPDATE Pagos SET saldo_pendiente = saldo_pendiente - abono WHERE venta_id = venta_id;
END //

DELIMITER ;

-- VISTAS

-- Vista para visualizar el registro de compra y precio de venta de cada producto
CREATE VIEW Registro_Compras_Ventas AS 
SELECT p.nombre_producto, dc.cantidad_comprada, dc.precio_unitario, p.precio_venta
FROM Productos p, Detalle_Compra dc
WHERE p.producto_id = dc.producto_id;

-- Vista para visualizar el stock actual y stock minimo de cada producto
CREATE VIEW Stock_Actual_Minimo AS
SELECT nombre_producto, stock_actual, stock_minimo
FROM Productos;

-- Vista para visualizar el total de ventas realizadas a cada cliente
CREATE VIEW Total_Ventas_Clientes AS
SELECT c.nombre_cliente, SUM(v.total_venta) AS total_ventas
FROM Ventas v, Clientes c
WHERE v.DNI_cliente = c.DNI_cliente
GROUP BY c.nombre_cliente;

-- Vista para visualizar el detalle de ventas por cliente para cada venta y que productos se vendieron
CREATE VIEW Detalle_Ventas_Clientes AS
SELECT c.nombre_cliente, v.venta_id, dv.producto_id, dv.cantidad_vendida, dv.precio_unitario, dv.subtotal
FROM Ventas v, Clientes c, Detalle_Venta dv
WHERE v.DNI_cliente = c.DNI_cliente AND v.venta_id = dv.venta_id;

-- Vista para historial de pedidos 
CREATE VIEW Historial_Pedidos AS
SELECT p.nombre_producto, pr.nombre_proveedor, dp.cantidad_solicitada, dp.cantidad_recibida, pe.fecha_pedido, pe.estado_pedido
FROM Productos p, Proveedores pr, Detalle_Pedido dp, Pedidos pe
WHERE p.producto_id = dp.producto_id AND pr.proveedor_id = pe.proveedor_id AND dp.pedido_id = pe.pedido_id;

-- Vista para historial de compras
CREATE VIEW Historial_Compras AS
SELECT p.nombre_producto, dc.cantidad_comprada, dc.precio_unitario, c.fecha_compra, c.monto_total
FROM Productos p, Detalle_Compra dc, Compras c
WHERE p.producto_id = dc.producto_id AND dc.compra_id = c.compra_id;

-- Vista para historial de pagos
CREATE VIEW Historial_Pagos AS
SELECT v.venta_id, c.nombre_cliente, p.monto_pagado, p.fecha_pago, p.metodo_pago, p.estado, p.saldo_pendiente
FROM Ventas v, Clientes c, Pagos p
WHERE v.DNI_cliente = c.DNI_cliente AND v.venta_id = p.venta_id;

-- Vista para inventario de productos
CREATE VIEW Inventario_Productos AS
SELECT nombre_producto, precio_venta, stock_actual, stock_minimo, unidad_medida
FROM Productos;

-- Vista para visualizar los productos que se estan agotando
CREATE VIEW Productos_Agotandose AS
SELECT nombre_producto, stock_actual, stock_minimo
FROM Productos
WHERE stock_actual <= stock_minimo;

-- Disparadores

-- Alerta de stock minimo
DELIMITER //

CREATE TRIGGER Alerta_Stock_Minimo
AFTER INSERT ON Productos
FOR EACH ROW
BEGIN
    IF NEW.stock_actual <= NEW.stock_minimo THEN
        INSERT INTO Alertas (mensaje) VALUES ('El producto ' + NEW.nombre_producto + ' esta por debajo del stock minimo');
    END IF;
END //

-- Actualizar stock actual despues de una venta
CREATE TRIGGER Actualizar_Stock_Venta
AFTER INSERT ON Detalle_Venta
FOR EACH ROW
BEGIN
    UPDATE Productos SET stock_actual = stock_actual - NEW.cantidad_vendida 
    WHERE producto_id = NEW.producto_id;
END //

-- Actualizar stock actual despues de una compra
CREATE TRIGGER Actualizar_Stock_Compra
AFTER INSERT ON Detalle_Compra
FOR EACH ROW
BEGIN
    UPDATE Productos SET stock_actual = stock_actual + NEW.cantidad_comprada 
    WHERE producto_id = NEW.producto_id;
END //

-- Actualizar saldo pendiente despues de un pago
CREATE TRIGGER Actualizar_Saldo_Pendiente
AFTER INSERT ON Pagos
FOR EACH ROW
BEGIN
    UPDATE Pagos SET saldo_pendiente = saldo_pendiente - NEW.monto_pagado
    WHERE venta_id = NEW.venta_id;
END //

-- Actualizar estado de pago despues de un pago
CREATE TRIGGER Actualizar_Estado_Pago
AFTER INSERT ON Pagos
FOR EACH ROW
BEGIN
    IF NEW.saldo_pendiente = 0 THEN
        UPDATE Pagos SET estado = 'completado'
        WHERE venta_id = NEW.venta_id;
    END IF;
END //

-- Atualizar estado de pedido despues de una compra
CREATE TRIGGER Actualizar_Estado_Pedido
AFTER INSERT ON Compras
FOR EACH ROW
BEGIN
    UPDATE Pedidos SET estado_pedido = 'completado'
    WHERE pedido_id = NEW.pedido_id;
END //

-- Actualizar total de venta despues de un descuento
CREATE TRIGGER Actualizar_Total_Venta
AFTER INSERT ON Ventas
FOR EACH ROW
BEGIN
    DECLARE descuento DECIMAL(5, 2);
    DECLARE total DECIMAL(10, 2);

    -- Se debe buscar el porcentaje de descuento del cliente
    SELECT porcentaje_dcto INTO descuento FROM Descuentos
    WHERE DNI_cliente = NEW.DNI_cliente;

    -- Se aplica el descuento al total si existe
    IF descuento IS NOT NULL OR descuento > 0 THEN
        SELECT total_venta INTO total FROM Ventas
        WHERE venta_id = NEW.venta_id;

        -- Se aplica el descuento
        SET total = total - (total * descuento);

        -- Se actualiza el total de la venta
        UPDATE Ventas SET total_venta = total WHERE venta_id = NEW.venta_id;
    END IF;
END //


DELIMITER ;