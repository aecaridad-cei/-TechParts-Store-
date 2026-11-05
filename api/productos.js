// Importamos el modelo para consultar la colección de productos.
import Producto from "../models/Producto.js";
// Importamos la arrow function que valida categorías.
import { esCategoriaValida } from "../config/categorias.js";
// Importamos la función ES6 que reutiliza la conexión con MongoDB.
import { connectDB } from "../config/database.js";

// Clase ES6 para distinguir errores del usuario (400) de errores del servidor.
class FiltroInvalidoError extends Error {}

// Arrow function que construye el objeto de filtro de Mongo.
// El parámetro tiene un valor por defecto ({}) para evitar errores si no llega nada.
const construirFiltro = ({ categoria, precioMax, compatibilidad } = {}) => {
  // Empezamos con un filtro vacío, que devolvería todos los productos.
  const filtro = {};

  // Si el usuario envía ?categoria=...
  if (categoria) {
    // Usamos la función centralizada para comprobar la categoría.
    if (!esCategoriaValida(categoria)) {
      // Si no es válida, lanzamos un error que se responderá como 400.
      throw new FiltroInvalidoError(`Categoría no válida: ${categoria}`);
    }
    // Añadimos la categoría al filtro de MongoDB.
    filtro.categoria = categoria;
  }

  // Si el usuario envía ?precioMax=... y el valor no está vacío.
  if (precioMax !== undefined && precioMax !== "") {
    // Convertimos el texto de la URL a número.
    const precio = Number(precioMax);

    // Number.isFinite comprueba que sea un número real y no NaN/Infinity.
    if (!Number.isFinite(precio) || precio < 0) {
      // Si no es válido, lanzamos un error que se responderá como 400.
      throw new FiltroInvalidoError(
        "El parámetro precioMax debe ser un número mayor o igual a 0"
      );
    }

    // Añadimos al filtro la condición precio <= precioMax.
    filtro.precio = { $lte: precio };
  }

  // Si el usuario envía ?compatibilidad=...
  if (compatibilidad) {
    // $in comprueba si el array compatibleCon contiene ese valor.
    filtro.compatibleCon = { $in: [compatibilidad] };
  }

  // Devolvemos el filtro listo para usarlo en Producto.find().
  return filtro;
};

// Arrow function asíncrona que actúa como handler HTTP.
const handler = async (req, res) => {
  // try/catch para responder siempre con JSON, incluso si hay errores.
  try {
    // Destructuring (ES6): extraemos query de la petición.
    const { query } = req;
    // Construimos el filtro antes de conectar para validar los parámetros.
    const filtro = construirFiltro(query);

    // Nos aseguramos de tener una conexión activa con MongoDB.
    await connectDB();

    // Promise.all (ES6) ejecuta las dos consultas en paralelo.
    // Destructuring (ES6): guardamos productos y total.
    const [productos, total] = await Promise.all([
      // Buscamos los productos y los ordenamos por precio ascendente.
      Producto.find(filtro).sort({ precio: 1 }).lean(),
      // Contamos cuántos productos cumplen el mismo filtro.
      Producto.countDocuments(filtro),
    ]);

    // Respondemos con código 200, el total y los productos encontrados.
    return res.status(200).json({ total, productos });
  } catch (error) {
    // Si el error es por un filtro inválido, respondemos 400.
    if (error instanceof FiltroInvalidoError) {
      return res.status(400).json({ error: error.message });
    }

    // Destructuring (ES6): extraemos el mensaje del error.
    const { message } = error;

    // Cualquier otro error se considera un fallo del servidor (500).
    return res.status(500).json({
      error: "Error al filtrar productos",
      detalle: message,
    });
  }
};

// Exportación por defecto (ES6) del handler.
export default handler;
