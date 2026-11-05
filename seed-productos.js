// Carga las variables del archivo .env en process.env.
import "dotenv/config";
// Importamos el modelo para insertar productos en MongoDB.
import Producto from "./models/Producto.js";
// Importamos el catálogo de 50 productos.
import productosIniciales from "./data/productos.js";
// Importamos las funciones ES6 de conexión y desconexión.
import { connectDB, disconnectDB } from "./config/database.js";

// Arrow function asíncrona que contiene la lógica principal del seed.
const poblarBaseDatos = async () => {
  // try contiene la lógica y catch captura cualquier error.
  try {
    // Abrimos la conexión con MongoDB.
    await connectDB();
    // Confirmamos que la conexión fue correcta.
    console.log("Conectado a MongoDB");

    // Borramos los productos anteriores para empezar de cero.
    await Producto.deleteMany({});
    // Confirmamos que la colección quedó vacía.
    console.log("Colección anterior limpiada");

    // insertMany inserta todo el array en una sola operación.
    const insertados = await Producto.insertMany(productosIniciales);
    // Destructuring (ES6): extraemos length del array de insertados.
    const { length } = insertados;
    // Mostramos cuántos documentos se insertaron.
    console.log(`Se insertaron ${length} productos correctamente`);
  } catch (error) {
    // Destructuring (ES6): extraemos el mensaje del error.
    const { message } = error;
    // Mostramos el mensaje del error.
    console.error("Error al poblar la base de datos:", message);
    // Marcamos el proceso como fallido.
    process.exitCode = 1;
  } finally {
    // finally se ejecuta siempre, haya error o no.
    await disconnectDB();
    // Avisamos de que la conexión se cerró.
    console.log("Desconectado de MongoDB");
  }
};

// Ejecutamos la arrow function principal.
poblarBaseDatos();
