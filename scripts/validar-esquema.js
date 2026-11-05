// Importamos el modelo usando módulos ES6.
import Producto from "../models/Producto.js";
// Importamos el catálogo real de 50 productos.
import productos from "../data/productos.js";

// Array de ejemplo con errores intencionados para probar el schema.
const productosInvalidos = [
  {
    codigo: "ERR001", // Código válido y único.
    nombre: "Intel Core i7", // Nombre válido.
    categoria: "Placas Base", // ERROR: no existe dentro del enum.
    precio: 299.99, // Precio válido.
    stock: 10, // Stock válido y entero.
    compatibleCon: ["LGA1700"], // Array de compatibilidad válido.
    destacado: true, // Booleano válido.
  },
  {
    codigo: "ERR002", // Código válido y único.
    nombre: "Memoria Corsair", // Nombre válido.
    categoria: "Memorias RAM", // Categoría válida.
    precio: -50, // ERROR: el precio no puede ser negativo.
    stock: 20, // Stock válido y entero.
    compatibleCon: ["DDR5"], // Array de compatibilidad válido.
    destacado: false, // Booleano válido.
  },
  {
    codigo: "ERR003", // Código válido y único.
    nombre: "SSD Kingston", // Nombre válido.
    categoria: "Almacenamiento", // Categoría válida.
    precio: 89.99, // Precio válido.
    stock: 5.5, // ERROR: el stock debe ser un número entero.
    compatibleCon: ["NVMe", "M.2"], // Array de compatibilidad válido.
    destacado: false, // Booleano válido.
  },
];

// Arrow function asíncrona que valida una lista de productos.
const validarProductos = async (lista, etiqueta) => {
  // Aquí guardaremos los productos que no pasen la validación.
  const errores = [];

  // for...of (ES6) recorre la lista con índice y datos.
  for (const [indice, datos] of lista.entries()) {
    // try intenta validar un producto.
    try {
      // new Producto(datos) crea un documento en memoria, sin guardarlo.
      const producto = new Producto(datos);
      // validate() ejecuta todas las validaciones del schema.
      await producto.validate();
    } catch (error) {
      // Si falla, guardamos el índice y el error de validación.
      errores.push({ indice, error });
    }
  }

  // Si no hubo errores, mostramos un mensaje indicando que todo está bien.
  if (errores.length === 0) {
    console.log(`OK ${etiqueta}: ${lista.length} productos válidos`);
    // Devolvemos true para indicar que la lista es válida.
    return true;
  }

  // Si hubo errores, mostramos cuántos productos fallaron.
  console.log(`ERROR ${etiqueta}: ${errores.length} productos con errores`);

  // Recorremos cada producto que falló.
  errores.forEach(({ indice, error }) => {
    // Mostramos el número de producto empezando en 1.
    console.log(`  Producto ${indice + 1}:`);
    // error.errors contiene un error por cada campo inválido.
    Object.values(error.errors).forEach(({ path, message }) => {
      // Mostramos el nombre del campo y el mensaje del schema.
      console.log(`  - Campo [${path}]: ${message}`);
    });
  });

  // Devolvemos false porque la lista tenía errores.
  return false;
};

// Cabecera de la validación del catálogo real.
console.log("=== Validación del catálogo ===");
// Validamos los 50 productos y guardamos si todos son válidos.
const catalogoValido = await validarProductos(productos, "Catálogo base");

// Cabecera de la demostración con errores esperados.
console.log("\n=== Errores esperados del esquema ===");
// Validamos los ejemplos inválidos; aquí esperamos que fallen.
await validarProductos(productosInvalidos, "Productos de ejemplo");

// Si el catálogo real tiene errores, marcamos el proceso como fallido.
if (!catalogoValido) {
  process.exitCode = 1;
}
