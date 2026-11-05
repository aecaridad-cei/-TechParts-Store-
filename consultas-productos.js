// Cargamos las variables de entorno del archivo .env.
import "dotenv/config";
// Importamos el modelo Producto para hacer las consultas.
import Producto from "./models/Producto.js";
// Importamos las funciones compartidas para conectar y desconectar.
import { connectDB, disconnectDB } from "./config/database.js";

// Precio máximo usado en la segunda consulta.
const PRECIO_MAXIMO = 150;
// Etiqueta de compatibilidad que buscamos en la tercera consulta.
const COMPATIBILIDAD_BUSCADA = "PCIe 4.0";
// Número máximo de productos destacados que mostraremos.
const LIMITE_DESTACADOS = 3;

// Consulta 1: tarjetas gráficas con stock disponible.
function obtenerTarjetasDisponibles() {
  return Producto.find({
    // Filtramos por la categoría exacta.
    categoria: "Tarjetas Gráficas",
    // $gte: 0 significa stock mayor o igual que cero.
    stock: { $gte: 0 },
  })
    // Seleccionamos solo los campos que nos interesan.
    .select("nombre precio stock -_id")
    // lean() devuelve objetos planos en vez de documentos de Mongoose.
    .lean();
}

// Consulta 2: productos cuyo precio no supera el máximo.
function obtenerProductosEconomicos() {
  // $lte significa menor o igual que PRECIO_MAXIMO.
  return Producto.find({ precio: { $lte: PRECIO_MAXIMO } })
    // Mostramos nombre, precio y categoría, ocultando _id.
    .select("nombre precio categoria -_id")
    // Obtenemos objetos simples para imprimirlos con console.table.
    .lean();
}

// Consulta 3: productos que incluyen una etiqueta de compatibilidad.
function obtenerProductosCompatibles() {
  return Producto.find({
    // $in comprueba si el array compatibleCon contiene el valor buscado.
    compatibleCon: { $in: [COMPATIBILIDAD_BUSCADA] },
  })
    // Seleccionamos el nombre y las etiquetas de compatibilidad.
    .select("nombre compatibleCon -_id")
    // Devolvemos objetos planos.
    .lean();
}

// Consulta 4: los productos destacados más caros.
function obtenerDestacadosMasCaros() {
  // Filtramos solo los productos marcados como destacados.
  return Producto.find({ destacado: true })
    // Orden descendente por precio: del más caro al más barato.
    .sort({ precio: -1 })
    // Limitamos el número de resultados.
    .limit(LIMITE_DESTACADOS)
    // Mostramos solo nombre y precio.
    .select("nombre precio -_id")
    // Devolvemos objetos planos.
    .lean();
}

// Función auxiliar para no repetir el mismo console.log y console.table.
function imprimirResultados(titulo, resultados) {
  // Imprimimos un salto de línea y el título de la consulta.
  console.log(`\n${titulo}`);
  // console.table muestra los arrays de objetos en formato tabla.
  console.table(resultados);
}

// Función principal que ejecuta todas las consultas.
async function ejecutarConsultas() {
  // try/catch/finally controla errores y cierra la conexión siempre.
  try {
    // Conectamos con MongoDB.
    await connectDB();
    // Cabecera del laboratorio de consultas.
    console.log("=== Laboratorio de Consultas ===");

    // Ejecutamos la primera consulta y guardamos el resultado.
    const tarjetas = await obtenerTarjetasDisponibles();
    // Mostramos cuántas tarjetas gráficas hay.
    console.log(`1. Tarjetas gráficas disponibles: ${tarjetas.length}`);
    // Mostramos las tarjetas en forma de tabla.
    console.table(tarjetas);

    // Ejecutamos la segunda consulta y la imprimimos con su título.
    imprimirResultados(
      `2. Productos por ${PRECIO_MAXIMO} EUR o menos`,
      await obtenerProductosEconomicos()
    );

    // Ejecutamos la tercera consulta y la imprimimos con su título.
    imprimirResultados(
      `3. Productos compatibles con ${COMPATIBILIDAD_BUSCADA}`,
      await obtenerProductosCompatibles()
    );

    // Ejecutamos la cuarta consulta y la imprimimos con su título.
    imprimirResultados(
      `4. Top ${LIMITE_DESTACADOS} productos destacados por precio`,
      await obtenerDestacadosMasCaros()
    );
  } catch (error) {
    // Si una consulta falla, mostramos el mensaje real del error.
    console.error("Error en las consultas:", error.message);
    // Marcamos el proceso como fallido.
    process.exitCode = 1;
  } finally {
    // Cerramos la conexión siempre, aunque haya errores.
    await disconnectDB();
    // Avisamos de que ya no estamos conectados.
    console.log("\nDesconectado de MongoDB");
  }
}

// Arrancamos la ejecución del laboratorio de consultas.
ejecutarConsultas();
