// Importamos mongoose usando módulos ES6.
import mongoose from "mongoose";
// Importamos la lista centralizada e inmutable de categorías.
import { CATEGORIAS } from "../config/categorias.js";

// Destructuring (ES6): extraemos Schema, models y model de mongoose.
const { Schema, models, model } = mongoose;

// Creamos el esquema que define la estructura de cada producto.
const productoSchema = new Schema(
  {
    // Código interno único que identifica al producto.
    codigo: {
      type: String, // Se guarda como texto.
      required: true, // Es obligatorio.
      unique: true, // MongoDB no permite códigos duplicados.
      uppercase: true, // Mongoose convierte el valor a mayúsculas.
      trim: true, // Elimina espacios al principio y al final.
    },
    // Nombre comercial que se mostrará al usuario.
    nombre: {
      type: String, // Se guarda como texto.
      required: true, // Es obligatorio.
      trim: true, // Elimina espacios sobrantes.
      // El nombre debe tener al menos 4 caracteres.
      minlength: [4, "El nombre debe tener como mínimo 4 caracteres"],
    },
    // Categoría a la que pertenece el producto.
    categoria: {
      type: String, // Se guarda como texto.
      required: true, // Es obligatoria.
      // El enum limita los valores permitidos a CATEGORIAS.
      enum: {
        values: CATEGORIAS, // Lista centralizada de categorías válidas.
        // Mensaje que se muestra si la categoría no es válida.
        message: "{VALUE} no es una categoría válida",
      },
    },
    // Precio del producto expresado en euros.
    precio: {
      type: Number, // Se guarda como número.
      required: true, // Es obligatorio.
      // El precio no puede ser negativo.
      min: [0, "El precio no puede ser negativo"],
    },
    // Número de unidades disponibles en inventario.
    stock: {
      type: Number, // Se guarda como número.
      required: true, // Es obligatorio.
      // El stock no puede ser negativo.
      min: [0, "El stock no puede ser negativo"],
      validate: {
        // Number.isInteger comprueba que no haya decimales.
        validator: Number.isInteger,
        // Mensaje que se muestra si el valor no es entero.
        message: "{VALUE} no es un número entero",
      },
    },
    // Etiquetas que indican con qué componentes es compatible.
    compatibleCon: {
      type: [String], // Array de textos.
      default: [], // Si no se indica, empieza vacío.
    },
    // Indica si el producto debe destacarse en la tienda.
    destacado: {
      type: Boolean, // Se guarda como true o false.
      default: false, // Por defecto no está destacado.
    },
  },
  // timestamps añade createdAt y updatedAt automáticamente.
  { timestamps: true }
);

// Reutilizamos el modelo si ya existe para evitar errores en recargas.
const Producto = models.Producto || model("Producto", productoSchema);

// Exportación por defecto (ES6) para usar el modelo en otros archivos.
export default Producto;
