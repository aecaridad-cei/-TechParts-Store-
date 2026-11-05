import Producto from "../models/Producto.js";
import { CATEGORIAS } from "../config/categorias.js";
import { connectDB } from "../config/database.js";

class FiltroInvalidoError extends Error {}

function construirFiltro({ categoria, precioMax, compatibilidad }) {
  const filtro = {};

  if (categoria) {
    if (!CATEGORIAS.includes(categoria)) {
      throw new FiltroInvalidoError(`Categoría no válida: ${categoria}`);
    }
    filtro.categoria = categoria;
  }

  if (precioMax !== undefined && precioMax !== "") {
    const precio = Number(precioMax);

    if (!Number.isFinite(precio) || precio < 0) {
      throw new FiltroInvalidoError(
        "El parámetro precioMax debe ser un número mayor o igual a 0"
      );
    }

    filtro.precio = { $lte: precio };
  }

  if (compatibilidad) {
    filtro.compatibleCon = { $in: [compatibilidad] };
  }

  return filtro;
}

export default async function handler(req, res) {
  try {
    await connectDB();

    const filtro = construirFiltro(req.query);

    const [productos, total] = await Promise.all([
      Producto.find(filtro).sort({ precio: 1 }).lean(),
      Producto.countDocuments(filtro),
    ]);

    return res.status(200).json({ total, productos });
  } catch (error) {
    if (error instanceof FiltroInvalidoError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({
      error: "Error al filtrar productos",
      detalle: error.message,
    });
  }
}
