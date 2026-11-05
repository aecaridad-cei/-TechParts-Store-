import mongoose from "mongoose";
import { CATEGORIAS } from "../config/categorias.js";

const productoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "El nombre debe tener como mínimo 4 caracteres"],
    },
    categoria: {
      type: String,
      required: true,
      enum: {
        values: CATEGORIAS,
        message: "{VALUE} no es una categoría válida",
      },
    },
    precio: {
      type: Number,
      required: true,
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "El stock no puede ser negativo"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} no es un número entero",
      },
    },
    compatibleCon: {
      type: [String],
      default: [],
    },
    destacado: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Producto =
  mongoose.models.Producto || mongoose.model("Producto", productoSchema);

export default Producto;
