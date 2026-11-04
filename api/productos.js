import mongoose from "mongoose";
import Producto from "../models/Producto.js";

// Punto de entrada de la nuestra Api: recibe una peticion HTTP y construye una respuesta JSON

export default async function handler(req, res) {
  try {

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }


    const { categoria, precioMax, compatibilidad } = req.query;


    const filtro = {};

    if (categoria) {
      filtro.categoria = categoria;
    }

    if (precioMax) {
      filtro.precio = { $lte: Number(precioMax) };
    }


    if (compatibilidad) {
      filtro.compatibleCon = { $in: [compatibilidad] };
    }


    const cursos = await Curso.find(filtro)
      .select(
        "codigo titulo categoria precio duracionHoras etiquetas instructor",
      )
      .sort({ precio: 1 });

    const total = await Producto.countDocuments(filtro);


    return res.status(200).json({
      total,
      productos
    });
  } catch (error) {

    return res.status(500).json({
      error: "Error al filtrar productos",
      detalle: error.message,
    });
  }
}