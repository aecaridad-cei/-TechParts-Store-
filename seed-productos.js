import "dotenv/config";
import Producto from "./models/Producto.js";
import productosIniciales from "./data/productos.js";
import { connectDB, disconnectDB } from "./config/database.js";

async function poblarBaseDatos() {
  try {
    await connectDB();
    console.log("Conectado a MongoDB");

    await Producto.deleteMany({});
    console.log("Colección anterior limpiada");

    const insertados = await Producto.insertMany(productosIniciales);
    console.log(`Se insertaron ${insertados.length} productos correctamente`);
  } catch (error) {
    console.error("Error al poblar la base de datos:", error.message);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
    console.log("Desconectado de MongoDB");
  }
}

poblarBaseDatos();
