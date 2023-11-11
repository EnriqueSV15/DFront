USE Prueba
GO

CREATE TABLE #VENTAS (IDVENTADETALLE INT, PRECIOUNITARIO INT, CANTIDAD INT, TOTALLINEA INT, IDPRODUCTO INT, NOMBREPRODUCTO VARCHAR(20), CODIGOPRODUCTO VARCHAR(20), IDMARCA INT, NOMBREMARCA VARCHAR(20), 
						MODELO VARCHAR(20), COSTOUNITARIO INT,IDVENTA INT, TOTAL DECIMAL(19,2), FECHA DATETIME, ID_LOCAL INT, NOMBRELOCAL VARCHAR(20), DIRECCION VARCHAR(20))

INSERT INTO #VENTAS
SELECT 
	VD.ID_VentaDetalle,
	VD.Precio_Unitario,
	VD.Cantidad,
	VD.TotalLinea,
	VD.ID_Producto,
	P.Nombre,
	P.Codigo,
	P.ID_Marca,
	M.Nombre,
	P.Modelo,
	P.Costo_Unitario,
	VD.ID_Venta,
	V.Total,
	V.Fecha,
	V.ID_Local,
	L.Nombre,
	L.Direccion
FROM 
	Venta V 
INNER JOIN 
	VentaDetalle VD 
ON 
	VD.ID_Venta = V.ID_Venta
INNER JOIN
	Producto P
ON
	P.ID_Producto = VD.ID_Producto
INNER JOIN
	Marca M
ON
	M.ID_Marca = P.ID_Marca
INNER JOIN
	LOCAL L
ON
	L.ID_Local = V.ID_Local
WHERE
	V.Fecha >= DATEADD(DAY, -30, GETDATE())

/****************TOTAL DE VENTAS DE LOS ÚLTIMOS 30 DÍAS************************************/
/****************CON MONTO TOTAL DE VENTAS Y CANTIDAD TOTAL DE VENTAS**********************/
SELECT
	SUM(TOTALLINEA) AS MontoTotalVentas,
	MAX(IDVENTA) AS CantidadTotalVentas
FROM
	#VENTAS
/*******************************************************************************************/

/*****DÍA Y HORA EN QUE SE REALIZÓ LA VENTA CON EL MONTO MÁS ALTO Y DEVOLVER EL MONTO*******/
SELECT TOP 1
    CONVERT(VARCHAR, FECHA, 103) AS Dia,
    CONVERT(VARCHAR, FECHA, 108) AS Hora,
    TOTAL AS MontoVenta
FROM
    #VENTAS
ORDER BY
    TOTAL DESC
/*******************************************************************************************/

/**********************PRODUCTO CON MAYOR MONTO TOTAL DE VENTAS*****************************/
SELECT TOP 1
    NOMBREPRODUCTO AS Producto,
    SUM(TOTALLINEA) AS MontoTotalVentas
FROM
    #VENTAS
GROUP BY
    NOMBREPRODUCTO
ORDER BY
    SUM(TOTALLINEA) DESC
/*******************************************************************************************/

/*******************************LOCAL CON MAYOR MONTO DE VENTAS*****************************/
SELECT TOP 1
    ID_LOCAL AS Codigo,
    NOMBRELOCAL AS Local,
    SUM(TOTAL) AS MontoTotalVentas
FROM
    #VENTAS
GROUP BY
    ID_LOCAL, NOMBRELOCAL
ORDER BY
    MontoTotalVentas DESC
/*******************************************************************************************/

/*****************************MARCA CON MAYOR MARGEN DE GANANCIAS***************************/
/*************(Cantidad vendida * Precio unitario) - (Cantidad vendida * Costo)*************/
SELECT TOP 1
    IDMARCA AS CodMarca,
    NOMBREMARCA AS Marca,
    SUM((CANTIDAD * PRECIOUNITARIO) - (CANTIDAD * COSTOUNITARIO)) AS MargenDeGanancias
FROM
    #VENTAS
GROUP BY
    IDMARCA, NOMBREMARCA
ORDER BY
    MargenDeGanancias DESC
/*******************************************************************************************/

/***************************PRODUCTO QUE MÁS SE VENDE EN CADA LOCAL*************************/
SELECT
    NOMBRELOCAL,
    Producto,
    MontoTotalVendido
FROM
    (
        SELECT
            NOMBRELOCAL,
            NOMBREPRODUCTO AS Producto,
            SUM(TOTALLINEA) AS MontoTotalVendido,
            RANK() OVER (PARTITION BY NOMBRELOCAL ORDER BY SUM(TOTALLINEA) DESC) AS Rango
        FROM
            #VENTAS
		GROUP BY
			NOMBRELOCAL,NOMBREPRODUCTO
    ) AS VentasPorProductoPorLocal
WHERE
    Rango = 1
/*******************************************************************************************/
DROP TABLE #VENTAS