// Importamos el modelo para consultar la colección de productos.
import Producto from "../models/Producto.js";
// Importamos las categorías válidas para validar el parámetro categoria.
import { CATEGORIAS } from "../config/categorias.js";
// Importamos la función que reutiliza la conexión con MongoDB.
import { connectDB } from "../config/database.js";

// Creamos un error personalizado para distinguir errores del usuario (400).
class FiltroInvalidoError extends Error {}

// Construye el objeto de filtro de Mongo a partir de los query params.
function construirFiltro({ categoria, precioMax, compatibilidad }) {
  // Empezamos con un filtro vacío, que devolvería todos los productos.
  const filtro = {};

  // Si el usuario envía ?categoria=...
  if (categoria) {
    // Comprobamos que la categoría exista en la lista permitida.
    if (!CATEGORIAS.includes(categoria)) {
      // Si no existe, lanzamos un error que se responderá como 400.
      throw new FiltroInvalidoError(`Categoría no válida: ${categoria}`);
    }
    // Añadimos la categoría al filtro de MongoDB.
    filtro.categoria = categoria;
  }

  // Si el usuario envía ?precioMax=... y el valor no está vacío.
  if (precioMax !== undefined && precioMax !== "") {
    // Convertimos el texto que llega por la URL a un número.
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
}

// Handler que se ejecuta en cada petición HTTP a la API.
export default async function handler(req, res) {
  // try/catch para responder siempre con JSON, incluso si hay errores.
  try {
    // Nos aseguramos de tener una conexión activa con MongoDB.
    await connectDB();

    // Construimos el filtro a partir de los parámetros de la URL.
    const filtro = construirFiltro(req.query);

    // Ejecutamos las dos consultas en paralelo para ganar velocidad.
    const [productos, total] = await Promise.all([
      // Buscamos los productos y los ordenamos de menor a mayor precio.
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

    // Cualquier otro error se considera un fallo del servidor (500).
    return res.status(500).json({
      error: "Error al filtrar productos",
      detalle: error.message,
    });
  }
}
