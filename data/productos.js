// Catálogo base de productos de TechParts Store.
//
// Este archivo solo contiene datos. La lógica para insertarlos en MongoDB
// está en seed-productos.js.
//
// Cada objeto debe cumplir el schema definido en models/Producto.js:
// - codigo: identificador único en mayúsculas. Ejemplo: "CPU001".
// - nombre: nombre comercial del producto, mínimo 4 caracteres.
// - categoria: debe coincidir con una categoría de config/categorias.js.
// - precio: número mayor o igual a 0, expresado en euros.
// - stock: número entero mayor o igual a 0.
// - compatibleCon: array de etiquetas de compatibilidad.
// - destacado: true si el producto debe resaltarse en la tienda.
//
// Los productos están agrupados por categoría para facilitar su lectura.

export default [
  // ============================================================
  // PROCESADORES
  // ============================================================
  // CPU001 · Intel Core i9 14900K
  {
    codigo: "CPU001",
    nombre: "Intel Core i9 14900K",
    categoria: "Procesadores",
    precio: 589.99,
    stock: 12,
    compatibleCon: ["LGA1700", "DDR5", "DDR4"],
    destacado: true,
  },
  // CPU002 · AMD Ryzen 5 7600X
  {
    codigo: "CPU002",
    nombre: "AMD Ryzen 5 7600X",
    categoria: "Procesadores",
    precio: 229.99,
    stock: 25,
    compatibleCon: ["AM5", "DDR5"],
    destacado: false,
  },
  // CPU003 · AMD Ryzen 9 7950X
  {
    codigo: "CPU003",
    nombre: "AMD Ryzen 9 7950X",
    categoria: "Procesadores",
    precio: 549.99,
    stock: 7,
    compatibleCon: ["AM5", "DDR5"],
    destacado: true,
  },
  // CPU004 · Intel Core i5 14600K
  {
    codigo: "CPU004",
    nombre: "Intel Core i5 14600K",
    categoria: "Procesadores",
    precio: 299.99,
    stock: 20,
    compatibleCon: ["LGA1700", "DDR5", "DDR4"],
    destacado: true,
  },
  // CPU005 · AMD Ryzen 7 7800X3D
  {
    codigo: "CPU005",
    nombre: "AMD Ryzen 7 7800X3D",
    categoria: "Procesadores",
    precio: 389.99,
    stock: 9,
    compatibleCon: ["AM5", "DDR5"],
    destacado: true,
  },
  // CPU006 · Intel Core i7 14700K
  {
    codigo: "CPU006",
    nombre: "Intel Core i7 14700K",
    categoria: "Procesadores",
    precio: 419.99,
    stock: 14,
    compatibleCon: ["LGA1700", "DDR5", "DDR4"],
    destacado: false,
  },
  // CPU007 · AMD Ryzen 5 5600
  {
    codigo: "CPU007",
    nombre: "AMD Ryzen 5 5600",
    categoria: "Procesadores",
    precio: 129.99,
    stock: 30,
    compatibleCon: ["AM4", "DDR4"],
    destacado: false,
  },
  // CPU008 · Intel Core i3 12100F
  {
    codigo: "CPU008",
    nombre: "Intel Core i3 12100F",
    categoria: "Procesadores",
    precio: 89.99,
    stock: 45,
    compatibleCon: ["LGA1700", "DDR4"],
    destacado: false,
  },
  // CPU009 · AMD Ryzen 9 7900X
  {
    codigo: "CPU009",
    nombre: "AMD Ryzen 9 7900X",
    categoria: "Procesadores",
    precio: 429.99,
    stock: 11,
    compatibleCon: ["AM5", "DDR5"],
    destacado: false,
  },
  // CPU010 · Intel Core i9 13900K
  {
    codigo: "CPU010",
    nombre: "Intel Core i9 13900K",
    categoria: "Procesadores",
    precio: 529.99,
    stock: 5,
    compatibleCon: ["LGA1700", "DDR5", "DDR4"],
    destacado: true,
  },
  // CPU011 · AMD Ryzen 5 8600G
  {
    codigo: "CPU011",
    nombre: "AMD Ryzen 5 8600G",
    categoria: "Procesadores",
    precio: 249.99,
    stock: 16,
    compatibleCon: ["AM5", "DDR5"],
    destacado: false,
  },
  // CPU012 · Intel Core i5 12400F
  {
    codigo: "CPU012",
    nombre: "Intel Core i5 12400F",
    categoria: "Procesadores",
    precio: 139.99,
    stock: 28,
    compatibleCon: ["LGA1700", "DDR4"],
    destacado: false,
  },

  // ============================================================
  // TARJETAS GRÁFICAS
  // ============================================================
  // GPU001 · NVIDIA RTX 4090
  {
    codigo: "GPU001",
    nombre: "NVIDIA RTX 4090",
    categoria: "Tarjetas Gráficas",
    precio: 1799.99,
    stock: 3,
    compatibleCon: ["PCIe 4.0", "PCIe 5.0"],
    destacado: true,
  },
  // GPU002 · AMD Radeon RX 7800 XT
  {
    codigo: "GPU002",
    nombre: "AMD Radeon RX 7800 XT",
    categoria: "Tarjetas Gráficas",
    precio: 549.99,
    stock: 8,
    compatibleCon: ["PCIe 4.0", "PCIe 5.0"],
    destacado: true,
  },
  // GPU003 · NVIDIA RTX 4080 Super
  {
    codigo: "GPU003",
    nombre: "NVIDIA RTX 4080 Super",
    categoria: "Tarjetas Gráficas",
    precio: 999.99,
    stock: 6,
    compatibleCon: ["PCIe 4.0", "PCIe 5.0"],
    destacado: true,
  },
  // GPU004 · NVIDIA RTX 4070 Ti Super
  {
    codigo: "GPU004",
    nombre: "NVIDIA RTX 4070 Ti Super",
    categoria: "Tarjetas Gráficas",
    precio: 799.99,
    stock: 10,
    compatibleCon: ["PCIe 4.0", "PCIe 5.0"],
    destacado: false,
  },
  // GPU005 · AMD Radeon RX 7900 XTX
  {
    codigo: "GPU005",
    nombre: "AMD Radeon RX 7900 XTX",
    categoria: "Tarjetas Gráficas",
    precio: 949.99,
    stock: 4,
    compatibleCon: ["PCIe 4.0", "PCIe 5.0"],
    destacado: true,
  },
  // GPU006 · NVIDIA RTX 4060 Ti
  {
    codigo: "GPU006",
    nombre: "NVIDIA RTX 4060 Ti",
    categoria: "Tarjetas Gráficas",
    precio: 389.99,
    stock: 22,
    compatibleCon: ["PCIe 4.0"],
    destacado: false,
  },
  // GPU007 · AMD Radeon RX 7600
  {
    codigo: "GPU007",
    nombre: "AMD Radeon RX 7600",
    categoria: "Tarjetas Gráficas",
    precio: 259.99,
    stock: 18,
    compatibleCon: ["PCIe 4.0"],
    destacado: false,
  },
  // GPU008 · NVIDIA RTX 3060 12GB
  {
    codigo: "GPU008",
    nombre: "NVIDIA RTX 3060 12GB",
    categoria: "Tarjetas Gráficas",
    precio: 279.99,
    stock: 25,
    compatibleCon: ["PCIe 4.0"],
    destacado: false,
  },
  // GPU009 · Intel Arc A770 16GB
  {
    codigo: "GPU009",
    nombre: "Intel Arc A770 16GB",
    categoria: "Tarjetas Gráficas",
    precio: 329.99,
    stock: 12,
    compatibleCon: ["PCIe 4.0"],
    destacado: false,
  },
  // GPU010 · NVIDIA RTX 4070 Super
  {
    codigo: "GPU010",
    nombre: "NVIDIA RTX 4070 Super",
    categoria: "Tarjetas Gráficas",
    precio: 599.99,
    stock: 15,
    compatibleCon: ["PCIe 4.0", "PCIe 5.0"],
    destacado: true,
  },
  // GPU011 · AMD Radeon RX 6600
  {
    codigo: "GPU011",
    nombre: "AMD Radeon RX 6600",
    categoria: "Tarjetas Gráficas",
    precio: 199.99,
    stock: 20,
    compatibleCon: ["PCIe 4.0"],
    destacado: false,
  },
  // GPU012 · NVIDIA RTX 3050 8GB
  {
    codigo: "GPU012",
    nombre: "NVIDIA RTX 3050 8GB",
    categoria: "Tarjetas Gráficas",
    precio: 179.99,
    stock: 35,
    compatibleCon: ["PCIe 4.0"],
    destacado: false,
  },

  // ============================================================
  // MEMORIAS RAM
  // ============================================================
  // RAM001 · Corsair Vengeance 16GB
  {
    codigo: "RAM001",
    nombre: "Corsair Vengeance 16GB",
    categoria: "Memorias RAM",
    precio: 49.99,
    stock: 40,
    compatibleCon: ["DDR4", "Intel", "AMD"],
    destacado: false,
  },
  // RAM002 · Kingston Fury 32GB DDR5
  {
    codigo: "RAM002",
    nombre: "Kingston Fury 32GB DDR5",
    categoria: "Memorias RAM",
    precio: 109.99,
    stock: 15,
    compatibleCon: ["DDR5", "AM5", "LGA1700"],
    destacado: true,
  },
  // RAM003 · G.Skill Trident Z 64GB
  {
    codigo: "RAM003",
    nombre: "G.Skill Trident Z 64GB",
    categoria: "Memorias RAM",
    precio: 189.99,
    stock: 0,
    compatibleCon: ["DDR5", "AMD", "Intel"],
    destacado: false,
  },
  // RAM004 · Corsair Dominator 32GB DDR5
  {
    codigo: "RAM004",
    nombre: "Corsair Dominator 32GB DDR5",
    categoria: "Memorias RAM",
    precio: 159.99,
    stock: 10,
    compatibleCon: ["DDR5", "AM5", "LGA1700"],
    destacado: true,
  },
  // RAM005 · TeamGroup T-Force 16GB DDR4
  {
    codigo: "RAM005",
    nombre: "TeamGroup T-Force 16GB DDR4",
    categoria: "Memorias RAM",
    precio: 39.99,
    stock: 50,
    compatibleCon: ["DDR4", "AM4", "LGA1700"],
    destacado: false,
  },
  // RAM006 · Crucial Ballistix 16GB DDR4
  {
    codigo: "RAM006",
    nombre: "Crucial Ballistix 16GB DDR4",
    categoria: "Memorias RAM",
    precio: 44.99,
    stock: 35,
    compatibleCon: ["DDR4", "Intel", "AMD"],
    destacado: false,
  },
  // RAM007 · G.Skill Ripjaws 32GB DDR4
  {
    codigo: "RAM007",
    nombre: "G.Skill Ripjaws 32GB DDR4",
    categoria: "Memorias RAM",
    precio: 79.99,
    stock: 22,
    compatibleCon: ["DDR4", "AM4", "LGA1700"],
    destacado: false,
  },
  // RAM008 · Kingston FURY Beast 16GB DDR5
  {
    codigo: "RAM008",
    nombre: "Kingston FURY Beast 16GB DDR5",
    categoria: "Memorias RAM",
    precio: 64.99,
    stock: 30,
    compatibleCon: ["DDR5", "AM5", "LGA1700"],
    destacado: true,
  },
  // RAM009 · Corsair Vengeance 64GB DDR5
  {
    codigo: "RAM009",
    nombre: "Corsair Vengeance 64GB DDR5",
    categoria: "Memorias RAM",
    precio: 219.99,
    stock: 8,
    compatibleCon: ["DDR5", "Intel", "AMD"],
    destacado: false,
  },
  // RAM010 · TeamGroup Elite 8GB DDR4
  {
    codigo: "RAM010",
    nombre: "TeamGroup Elite 8GB DDR4",
    categoria: "Memorias RAM",
    precio: 24.99,
    stock: 60,
    compatibleCon: ["DDR4", "AM4", "LGA1700"],
    destacado: false,
  },
  // RAM011 · Crucial Pro 32GB DDR5
  {
    codigo: "RAM011",
    nombre: "Crucial Pro 32GB DDR5",
    categoria: "Memorias RAM",
    precio: 99.99,
    stock: 25,
    compatibleCon: ["DDR5", "AM5", "LGA1700"],
    destacado: false,
  },
  // RAM012 · Patriot Viper 16GB DDR4
  {
    codigo: "RAM012",
    nombre: "Patriot Viper 16GB DDR4",
    categoria: "Memorias RAM",
    precio: 42.99,
    stock: 40,
    compatibleCon: ["DDR4", "Intel", "AMD"],
    destacado: false,
  },

  // ============================================================
  // ALMACENAMIENTO
  // ============================================================
  // SSD001 · Samsung 990 Pro 2TB
  {
    codigo: "SSD001",
    nombre: "Samsung 990 Pro 2TB",
    categoria: "Almacenamiento",
    precio: 169.99,
    stock: 18,
    compatibleCon: ["NVMe", "M.2", "PCIe 4.0"],
    destacado: true,
  },
  // SSD002 · Kingston NV2 1TB
  {
    codigo: "SSD002",
    nombre: "Kingston NV2 1TB",
    categoria: "Almacenamiento",
    precio: 64.99,
    stock: 32,
    compatibleCon: ["NVMe", "M.2", "PCIe 4.0"],
    destacado: false,
  },
  // HDD001 · Seagate Barracuda 4TB
  {
    codigo: "HDD001",
    nombre: "Seagate Barracuda 4TB",
    categoria: "Almacenamiento",
    precio: 99.99,
    stock: 6,
    compatibleCon: ["SATA III", "3.5 pulgadas"],
    destacado: false,
  },
  // SSD003 · Crucial P3 Plus 1TB
  {
    codigo: "SSD003",
    nombre: "Crucial P3 Plus 1TB",
    categoria: "Almacenamiento",
    precio: 59.99,
    stock: 28,
    compatibleCon: ["NVMe", "M.2", "PCIe 4.0"],
    destacado: true,
  },
  // SSD004 · WD Black SN850X 2TB
  {
    codigo: "SSD004",
    nombre: "WD Black SN850X 2TB",
    categoria: "Almacenamiento",
    precio: 149.99,
    stock: 14,
    compatibleCon: ["NVMe", "M.2", "PCIe 4.0"],
    destacado: true,
  },
  // SSD005 · Samsung 870 EVO 1TB
  {
    codigo: "SSD005",
    nombre: "Samsung 870 EVO 1TB",
    categoria: "Almacenamiento",
    precio: 89.99,
    stock: 20,
    compatibleCon: ["SATA III", "2.5 pulgadas"],
    destacado: false,
  },
  // SSD006 · Crucial BX500 480GB
  {
    codigo: "SSD006",
    nombre: "Crucial BX500 480GB",
    categoria: "Almacenamiento",
    precio: 34.99,
    stock: 45,
    compatibleCon: ["SATA III", "2.5 pulgadas"],
    destacado: false,
  },
  // SSD007 · Kingston KC3000 2TB
  {
    codigo: "SSD007",
    nombre: "Kingston KC3000 2TB",
    categoria: "Almacenamiento",
    precio: 179.99,
    stock: 7,
    compatibleCon: ["NVMe", "M.2", "PCIe 4.0"],
    destacado: false,
  },
  // SSD008 · Seagate FireCuda 530 1TB
  {
    codigo: "SSD008",
    nombre: "Seagate FireCuda 530 1TB",
    categoria: "Almacenamiento",
    precio: 119.99,
    stock: 9,
    compatibleCon: ["NVMe", "M.2", "PCIe 4.0"],
    destacado: false,
  },
  // SSD009 · WD Green SN350 1TB
  {
    codigo: "SSD009",
    nombre: "WD Green SN350 1TB",
    categoria: "Almacenamiento",
    precio: 54.99,
    stock: 25,
    compatibleCon: ["NVMe", "M.2", "PCIe 3.0"],
    destacado: false,
  },
  // SSD010 · Lexar NM620 512GB
  {
    codigo: "SSD010",
    nombre: "Lexar NM620 512GB",
    categoria: "Almacenamiento",
    precio: 32.99,
    stock: 33,
    compatibleCon: ["NVMe", "M.2", "PCIe 3.0"],
    destacado: false,
  },
  // HDD002 · WD Blue 2TB
  {
    codigo: "HDD002",
    nombre: "WD Blue 2TB",
    categoria: "Almacenamiento",
    precio: 54.99,
    stock: 15,
    compatibleCon: ["SATA III", "3.5 pulgadas"],
    destacado: false,
  },
  // HDD003 · Toshiba P300 3TB
  {
    codigo: "HDD003",
    nombre: "Toshiba P300 3TB",
    categoria: "Almacenamiento",
    precio: 74.99,
    stock: 10,
    compatibleCon: ["SATA III", "3.5 pulgadas"],
    destacado: false,
  },
  // HDD004 · Seagate IronWolf 8TB
  {
    codigo: "HDD004",
    nombre: "Seagate IronWolf 8TB",
    categoria: "Almacenamiento",
    precio: 199.99,
    stock: 4,
    compatibleCon: ["SATA III", "3.5 pulgadas"],
    destacado: true,
  },
];
