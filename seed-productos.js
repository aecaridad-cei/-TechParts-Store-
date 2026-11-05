// Carga las variables del archivo .env dentro de process.env.
import "dotenv/config";
// Importamos el modelo para poder insertar productos en MongoDB.
import Producto from "./models/Producto.js";
// Importamos el catálogo de 50 productos desde data/productos.js.
import productosIniciales from "./data/productos.js";
// Importamos las funciones compartidas para conectar y desconectar.
import { connectDB, disconnectDB } from "./config/database.js";

// Función principal que puebla la base de datos.
async function poblarBaseDatos() {
  // try contiene la lógica principal y catch captura cualquier error.
  try {
    // Abrimos la conexión con MongoDB usando la URI del .env.
    await connectDB();
    // Mostramos un mensaje para confirmar que la conexión fue correcta.
    console.log("Conectado a MongoDB");

    // Borramos todos los productos anteriores para empezar de cero.
    await Producto.deleteMany({});
    // Confirmamos que la colección anterior quedó vacía.
    console.log("Colección anterior limpiada");

    // insertMany inserta todos los productos en una sola operación.
    const insertados = await Producto.insertMany(productosIniciales);
    // Mostramos cuántos documentos se insertaron realmente.
    console.log(`Se insertaron ${insertados.length} productos correctamente`);
  } catch (error) {
    // Si algo falla, mostramos el mensaje del error.
    console.error("Error al poblar la base de datos:", error.message);
    // Marcamos el proceso como fallido para que la terminal lo detecte.
    process.exitCode = 1;
  } finally {
    // finally se ejecuta siempre, haya error o no.
    await disconnectDB();
    // Avisamos de que la conexión se cerró.
    console.log("Desconectado de MongoDB");
  }
}

// Ejecutamos la función principal al arrancar el archivo.
poblarBaseDatos();
