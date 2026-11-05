import Producto from "../models/Producto.js";
import productos from "../data/productos.js";

const productosInvalidos = [
  {
    codigo: "ERR001",
    nombre: "Intel Core i7",
    categoria: "Placas Base",
    precio: 299.99,
    stock: 10,
    compatibleCon: ["LGA1700"],
    destacado: true,
  },
  {
    codigo: "ERR002",
    nombre: "Memoria Corsair",
    categoria: "Memorias RAM",
    precio: -50,
    stock: 20,
    compatibleCon: ["DDR5"],
    destacado: false,
  },
  {
    codigo: "ERR003",
    nombre: "SSD Kingston",
    categoria: "Almacenamiento",
    precio: 89.99,
    stock: 5.5,
    compatibleCon: ["NVMe", "M.2"],
    destacado: false,
  },
];

async function validarProductos(lista, etiqueta) {
  const errores = [];

  for (const [indice, datos] of lista.entries()) {
    try {
      await new Producto(datos).validate();
    } catch (error) {
      errores.push({ indice, error });
    }
  }

  if (errores.length === 0) {
    console.log(`OK ${etiqueta}: ${lista.length} productos válidos`);
    return true;
  }

  console.log(`ERROR ${etiqueta}: ${errores.length} productos con errores`);

  errores.forEach(({ indice, error }) => {
    console.log(`  Producto ${indice + 1}:`);
    Object.values(error.errors).forEach(({ path, message }) => {
      console.log(`  - Campo [${path}]: ${message}`);
    });
  });

  return false;
}

console.log("=== Validación del catálogo ===");
const catalogoValido = await validarProductos(productos, "Catálogo base");

console.log("\n=== Errores esperados del esquema ===");
await validarProductos(productosInvalidos, "Productos de ejemplo");

if (!catalogoValido) {
  process.exitCode = 1;
}
