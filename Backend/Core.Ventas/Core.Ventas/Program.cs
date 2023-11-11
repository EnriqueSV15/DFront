using Core.Ventas;


using (var ventasDbContext = new VentasDbContext())
{
    var ventasLista = ventasDbContext.Venta
                    .Where(x => x.Fecha >= DateTime.Now.AddDays(-30));

    //El total de ventas de los últimos 30 días (monto total y cantidad total de ventas).
    Console.WriteLine("Ejercicio 1:");
    Console.WriteLine("Cantidad de Ventas: " + ventasLista.Count());
    Console.WriteLine("Monto Total de Ventas: " + ventasLista.Sum(s => s.Total).ToString("N2"));
    Console.WriteLine("\n");

    //El día y hora en que se realizó la venta con el monto más alto (y cuál es aquel monto).
    var result = ventasLista.OrderByDescending(orden => orden.Total).FirstOrDefault();

    Console.WriteLine("Ejercicio 2:");
    Console.WriteLine("El monto de la venta más alto fue " + result?.Total.ToString("N2") + " y se realizó el " + result?.Fecha);
    Console.WriteLine("\n");

    //Indicar cuál es el producto con mayor monto total de ventas. El total de ventas de un producto
    //se encuentra en la tabla VentaDetalle columna TotalLinea.
    var ListaVenta = ventasLista.SelectMany(select => select.VentaDetalles, (venta, detalle) => new
    {
        NombreProducto = detalle.IdProductoNavigation.Nombre,
        MontoTotalVenta = detalle.TotalLinea
    })
        .GroupBy(detalle => detalle.NombreProducto)
        .Select(r => new
        {
            NombreProducto = r.Key,
            MontoTotalVenta = r.Sum(detalle => detalle.MontoTotalVenta)
        })
        .OrderByDescending(orden => orden.MontoTotalVenta)
        .FirstOrDefault();

    Console.WriteLine("Ejercicio 3:");
    Console.WriteLine("El producto con mayor monto de ventas es: " + ListaVenta?.NombreProducto);
    Console.WriteLine("Con un monto total de ventas de: " + ListaVenta?.MontoTotalVenta.ToString("N2"));
    Console.WriteLine("\n");

    //Indicar el local con mayor monto de ventas.
    var ListaVentas = ventasLista.Select(select => new
    {
        NombreLocal = select.IdLocalNavigation.Nombre,
        MontoVenta = select.Total
    })
        .GroupBy(agrupar => agrupar.NombreLocal)
        .Select(select => new
        {
            NombreLocal = select.Key,
            MontoVentas = select.Sum(venta => venta.MontoVenta)
        })
        .OrderByDescending(orden => orden.MontoVentas)
        .FirstOrDefault();

    Console.WriteLine("Ejercicio 4:");
    Console.WriteLine("El local con mayor monto ventas es: " + ListaVentas?.NombreLocal);
    Console.WriteLine("\n");

    //¿Cuál es la marca con mayor margen de ganancias? El margen de ganancias de un producto
    //está dado por(Cantidad vendida * Precio unitario) - (Cantidad vendida* Costo).
    var ListVentas = ventasLista.SelectMany(select => select.VentaDetalles, (venta, detalle) => new
    {
        venta,
        detalle
    })
        .Select(venta => new
        {
            NombreMarca = venta.detalle.IdProductoNavigation.IdMarcaNavigation.Nombre,
            MontoVenta = (venta.detalle.PrecioUnitario - venta.detalle.IdProductoNavigation.CostoUnitario) * venta.detalle.Cantidad

        })
        .GroupBy(agrupar => agrupar.NombreMarca)
        .Select(select => new
        {
            NombreMarca = select.Key,
            MontoVentas = select.Sum(detalle => detalle.MontoVenta)
        })
        .OrderByDescending(orden => orden.MontoVentas)
        .FirstOrDefault();

    Console.WriteLine("Ejercicio 5:");
    Console.WriteLine("La marca con mayor margen de ganancias es: " + ListVentas?.NombreMarca);
    Console.WriteLine("\n");

    //¿Cómo obtendrías cuál es el producto que más se vende en cada local?
    var resultado = ventasLista.SelectMany(select => select.VentaDetalles, (venta, detalle) => new
    {
        NombreLocal = venta.IdLocalNavigation.Nombre,
        NombreProducto = detalle.IdProductoNavigation.Nombre,
        MontoVenta = detalle.TotalLinea
    })
        .GroupBy(agrupar => new { agrupar.NombreLocal, agrupar.NombreProducto })
        .Select(select => new
        {
            NombreLocal = select.Key.NombreLocal,
            NombreProducto = select.Key.NombreProducto,
            CantidadVentas = select.Sum(detalle => detalle.MontoVenta)
        })
        .GroupBy(agrupar => agrupar.NombreLocal)
        .Select(select => new
        {
            NombreLocal = select.Key,
            ProductoMasVentas = select.OrderByDescending(orden => orden.CantidadVentas).First()
        })
        .ToList();

    Console.WriteLine("Ejercicio 6:");
    Console.WriteLine("Lista de productos que más se venden en cada local");
    Console.WriteLine($"{("Local").PadRight(20)}{("Producto").PadRight(30)}{("Cantidad de Ventas").PadRight(10)}");
    Console.WriteLine(new string('-', 80));

    foreach (var item in resultado)
    {
        Console.WriteLine($"{item.NombreLocal.PadRight(20)}" +
            $"{item.ProductoMasVentas.NombreProducto.PadRight(30)}" +
            $"{item.ProductoMasVentas.CantidadVentas.ToString("N2").PadRight(10)}");
    }
}