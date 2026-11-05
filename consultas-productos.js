// Cargamos las variables de entorno del archivo .env.
import "dotenv/config";
// Importamos el modelo Producto para hacer las consultas.
import Producto from "./models/Producto.js";
// Importamos las funciones ES6 de conexión y desconexión.
import { connectDB, disconnectDB } from "./config/database.js";

// Precio máximo usado en la segunda consulta.
const PRECIO_MAXIMO = 150;
// Etiqueta de compatibilidad que buscamos en la tercera consulta.
const COMPATIBILIDAD_BUSCADA = "PCIe 4.0";
// Número máximo de productos destacados que mostraremos.
const LIMITE_DESTACADOS = 3;

// Arrow function (ES6) con retorno implícito.
// Consulta 1: tarjetas gráficas con stock disponible.
const obtenerTarjetasDisponibles = () =>
  Producto.find({
    categoria: "Tarjetas Gráficas", // Filtramos por categoría exacta.
    stock: { $gte: 0 }, // $gte: 0 significa stock mayor o igual que cero.
  })
    .select("nombre precio stock -_id") // Seleccionamos los campos necesarios.
    .lean(); // lean() devuelve objetos planos en vez de documentos Mongoose.

// Arrow function con retorno implícito.
// Consulta 2: productos cuyo precio no supera el máximo.
const obtenerProductosEconomicos = () =>
  Producto.find({ precio: { $lte: PRECIO_MAXIMO } }) // $lte: menor o igual.
    .select("nombre precio categoria -_id") // Mostramos nombre, precio y categoría.
    .lean(); // Obtenemos objetos simples para console.table.

// Arrow function con retorno implícito.
// Consulta 3: productos que incluyen una etiqueta de compatibilidad.
const obtenerProductosCompatibles = () =>
  Producto.find({
    compatibleCon: { $in: [COMPATIBILIDAD_BUSCADA] }, // $in busca dentro del array.
  })
    .select("nombre compatibleCon -_id") // Mostramos nombre y compatibilidad.
    .lean(); // Devolvemos objetos planos.

// Arrow function con retorno implícito.
// Consulta 4: los productos destacados más caros.
const obtenerDestacadosMasCaros = () =>
  Producto.find({ destacado: true }) // Solo productos destacados.
    .sort({ precio: -1 }) // Orden descendente: del más caro al más barato.
    .limit(LIMITE_DESTACADOS) // Limitamos el número de resultados.
    .select("nombre precio -_id") // Mostramos solo nombre y precio.
    .lean(); // Devolvemos objetos planos.

// Arrow function auxiliar para imprimir resultados.
const imprimirResultados = (titulo, resultados) => {
  // Imprimimos un salto de línea y el título de la consulta.
  console.log(`\n${titulo}`);
  // console.table muestra los arrays de objetos en formato tabla.
  console.table(resultados);
};

// Arrow function asíncrona que ejecuta todas las consultas.
const ejecutarConsultas = async () => {
  // try/catch/finally controla errores y cierra la conexión siempre.
  try {
    // Conectamos con MongoDB.
    await connectDB();
    // Cabecera del laboratorio de consultas.
    console.log("=== Laboratorio de Consultas ===");

    // Promise.all (ES6) ejecuta las cuatro consultas en paralelo.
    // Destructuring (ES6): guardamos cada resultado en su variable.
    const [tarjetas, economicos, compatibles, destacados] = await Promise.all([
      obtenerTarjetasDisponibles(),
      obtenerProductosEconomicos(),
      obtenerProductosCompatibles(),
      obtenerDestacadosMasCaros(),
    ]);

    // Mostramos cuántas tarjetas gráficas hay.
    console.log(`1. Tarjetas gráficas disponibles: ${tarjetas.length}`);
    // Mostramos las tarjetas en forma de tabla.
    console.table(tarjetas);

    // Imprimimos los productos económicos.
    imprimirResultados(
      `2. Productos por ${PRECIO_MAXIMO} EUR o menos`,
      economicos
    );

    // Imprimimos los productos compatibles con PCIe 4.0.
    imprimirResultados(
      `3. Productos compatibles con ${COMPATIBILIDAD_BUSCADA}`,
      compatibles
    );

    // Imprimimos los productos destacados más caros.
    imprimirResultados(
      `4. Top ${LIMITE_DESTACADOS} productos destacados por precio`,
      destacados
    );
  } catch (error) {
    // Destructuring (ES6): extraemos el mensaje del error.
    const { message } = error;
    // Mostramos el mensaje real del error.
    console.error("Error en las consultas:", message);
    // Marcamos el proceso como fallido.
    process.exitCode = 1;
  } finally {
    // Cerramos la conexión siempre, aunque haya errores.
    await disconnectDB();
    // Avisamos de que ya no estamos conectados.
    console.log("\nDesconectado de MongoDB");
  }
};

// Arrancamos la ejecución del laboratorio.
ejecutarConsultas();
