// Importamos mongoose para definir el esquema y crear el modelo.
import mongoose from "mongoose";
// Importamos la lista centralizada de categorías válidas.
import { CATEGORIAS } from "../config/categorias.js";

// Creamos el esquema que define la estructura de cada producto.
const productoSchema = new mongoose.Schema(
  {
    // Código interno único que identifica al producto.
    codigo: {
      type: String, // El código se guarda como texto.
      required: true, // Es obligatorio.
      unique: true, // MongoDB no permite dos productos con el mismo código.
      uppercase: true, // Mongoose convierte automáticamente a mayúsculas.
      trim: true, // Elimina espacios al principio y al final.
    },
    // Nombre comercial que se mostrará al usuario.
    nombre: {
      type: String, // El nombre se guarda como texto.
      required: true, // Es obligatorio.
      trim: true, // Elimina espacios sobrantes.
      // El nombre debe tener al menos 4 caracteres.
      minlength: [4, "El nombre debe tener como mínimo 4 caracteres"],
    },
    // Categoría a la que pertenece el producto.
    categoria: {
      type: String, // La categoría se guarda como texto.
      required: true, // Es obligatoria.
      // El enum limita los valores permitidos a la lista CATEGORIAS.
      enum: {
        values: CATEGORIAS, // Solo acepta las categorías centralizadas.
        // Mensaje que se muestra si llega una categoría no permitida.
        message: "{VALUE} no es una categoría válida",
      },
    },
    // Precio del producto expresado en euros.
    precio: {
      type: Number, // El precio se guarda como número.
      required: true, // Es obligatorio.
      // El precio no puede ser negativo.
      min: [0, "El precio no puede ser negativo"],
    },
    // Número de unidades disponibles en inventario.
    stock: {
      type: Number, // El stock se guarda como número.
      required: true, // Es obligatorio.
      // El stock no puede ser negativo.
      min: [0, "El stock no puede ser negativo"],
      validate: {
        // Number.isInteger comprueba que el número no tenga decimales.
        validator: Number.isInteger,
        // Mensaje que se muestra si el valor no es entero.
        message: "{VALUE} no es un número entero",
      },
    },
    // Etiquetas que indican con qué componentes es compatible.
    compatibleCon: {
      type: [String], // Es un array de textos.
      default: [], // Si no se indica, empieza como array vacío.
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
const Producto =
  // Si mongoose ya registró el modelo "Producto", lo reutilizamos.
  mongoose.models.Producto ||
  // Si no existe, lo creamos a partir del esquema.
  mongoose.model("Producto", productoSchema);

// Exportamos el modelo para usarlo en el seed, las consultas y la API.
export default Producto;
