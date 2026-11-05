import "dotenv/config";
import Producto from "./models/Producto.js";
import { connectDB, disconnectDB } from "./config/database.js";

const PRECIO_MAXIMO = 150;
const COMPATIBILIDAD_BUSCADA = "PCIe 4.0";
const LIMITE_DESTACADOS = 3;

function obtenerTarjetasDisponibles() {
  return Producto.find({
    categoria: "Tarjetas Gráficas",
    stock: { $gte: 0 },
  })
    .select("nombre precio stock -_id")
    .lean();
}

function obtenerProductosEconomicos() {
  return Producto.find({ precio: { $lte: PRECIO_MAXIMO } })
    .select("nombre precio categoria -_id")
    .lean();
}

function obtenerProductosCompatibles() {
  return Producto.find({
    compatibleCon: { $in: [COMPATIBILIDAD_BUSCADA] },
  })
    .select("nombre compatibleCon -_id")
    .lean();
}

function obtenerDestacadosMasCaros() {
  return Producto.find({ destacado: true })
    .sort({ precio: -1 })
    .limit(LIMITE_DESTACADOS)
    .select("nombre precio -_id")
    .lean();
}

function imprimirResultados(titulo, resultados) {
  console.log(`\n${titulo}`);
  console.table(resultados);
}

async function ejecutarConsultas() {
  try {
    await connectDB();
    console.log("=== Laboratorio de Consultas ===");

    const tarjetas = await obtenerTarjetasDisponibles();
    console.log(`1. Tarjetas gráficas disponibles: ${tarjetas.length}`);
    console.table(tarjetas);

    imprimirResultados(
      `2. Productos por ${PRECIO_MAXIMO} EUR o menos`,
      await obtenerProductosEconomicos()
    );

    imprimirResultados(
      `3. Productos compatibles con ${COMPATIBILIDAD_BUSCADA}`,
      await obtenerProductosCompatibles()
    );

    imprimirResultados(
      `4. Top ${LIMITE_DESTACADOS} productos destacados por precio`,
      await obtenerDestacadosMasCaros()
    );
  } catch (error) {
    console.error("Error en las consultas:", error.message);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
    console.log("\nDesconectado de MongoDB");
  }
}

ejecutarConsultas();
