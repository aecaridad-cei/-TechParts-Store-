// Exportamos una lista inmutable usando Object.freeze.
// Así evitamos que alguien modifique las categorías por accidente.
export const CATEGORIAS = Object.freeze([
  "Procesadores", // Categoría para CPUs (Intel, AMD...).
  "Tarjetas Gráficas", // Categoría para GPUs (NVIDIA, AMD, Intel...).
  "Memorias RAM", // Categoría para módulos de memoria.
  "Almacenamiento", // Categoría para discos SSD y HDD.
]);

// Arrow function (ES6) que centraliza la comprobación de categorías.
// Se reutiliza en la API para no repetir la lógica de validación.
export const esCategoriaValida = (categoria) => CATEGORIAS.includes(categoria);
