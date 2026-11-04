import mongoose from "mongoose"
import dotenv from 'dotenv'
import Producto from './models/Producto.js'

dotenv.config()

const productosIniciales = [
    {
        codigo: "CPU001",
        nombre: "Intel Core i9 14900K",
        categoria: "Procesadores",
        precio: 589.99,
        stock: 12,
        compatibleCon: ["LGA1700", "DDR5", "DDR4"],
        destacado: true
    },
    {
        codigo: "CPU002",
        nombre: "AMD Ryzen 5 7600X",
        categoria: "Procesadores",
        precio: 229.99,
        stock: 25,
        compatibleCon: ["AM5", "DDR5"],
        destacado: false
    },
    {
        codigo: "GPU001",
        nombre: "NVIDIA RTX 4090",
        categoria: "Tarjetas Gráficas",
        precio: 1799.99,
        stock: 3,
        compatibleCon: ["PCIe 4.0", "PCIe 5.0"],
        destacado: true
    },
    {
        codigo: "GPU002",
        nombre: "AMD Radeon RX 7800 XT",
        categoria: "Tarjetas Gráficas",
        precio: 549.99,
        stock: 8,
        compatibleCon: ["PCIe 4.0", "PCIe 5.0"],
        destacado: true
    },
    {
        codigo: "RAM001",
        nombre: "Corsair Vengeance 16GB",
        categoria: "Memorias RAM",
        precio: 49.99,
        stock: 40,
        compatibleCon: ["DDR4", "Intel", "AMD"],
        destacado: false
    },
    {
        codigo: "RAM002",
        nombre: "Kingston Fury 32GB DDR5",
        categoria: "Memorias RAM",
        precio: 109.99,
        stock: 15,
        compatibleCon: ["DDR5", "AM5", "LGA1700"],
        destacado: true
    },
    {
        codigo: "RAM003",
        nombre: "G.Skill Trident Z 64GB",
        categoria: "Memorias RAM",
        precio: 189.99,
        stock: 0,
        compatibleCon: ["DDR5", "AMD", "Intel"],
        destacado: false
    },
    {
        codigo: "SSD001",
        nombre: "Samsung 990 Pro 2TB",
        categoria: "Almacenamiento",
        precio: 169.99,
        stock: 18,
        compatibleCon: ["NVMe", "M.2", "PCIe 4.0"],
        destacado: true
    },
    {
        codigo: "SSD002",
        nombre: "Kingston NV2 1TB",
        categoria: "Almacenamiento",
        precio: 64.99,
        stock: 32,
        compatibleCon: ["NVMe", "M.2", "PCIe 4.0"],
        destacado: false
    },
    {
        codigo: "HDD001",
        nombre: "Seagate Barracuda 4TB",
        categoria: "Almacenamiento",
        precio: 99.99,
        stock: 6,
        compatibleCon: ["SATA III", "3.5 pulgadas"],
        destacado: false
    }
];

async function poblarBaseDatos() {
    try {

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Conectado a MongoDB")

        await Producto.deleteMany({})
        console.log("Coleccion anterior limpiada")

        const insertados = await Producto.insertMany(productosIniciales)
        console.log(`Se insertaron ${insertados.length} productos correctamente`)

        try {

            await Producto.insertMany([{
                codigo: "ERR001",
                nombre: "Intel Core i7",
                categoria: "Placas Base", // Categoría no permitida
                precio: 299.99,
                stock: 10,
                compatibleCon: ["LGA1700"],
                destacado: true
            },
            {
                codigo: "ERR002",
                nombre: "Memoria Corsair",
                categoria: "Memorias RAM",
                precio: -50, // Precio negativo
                stock: 20,
                compatibleCon: ["DDR5"],
                destacado: false
            },
            {
                codigo: "ERR003",
                nombre: "SSD Kingston",
                categoria: "Almacenamiento",
                precio: 89.99,
                stock: 5.5, // No es un número entero
                compatibleCon: ["NVMe", "M.2"],
                destacado: false
            }], { ordered: false, throwOnValidationError: true }) // Valida e intenta insertar todos los objetos aunque alguno tenga errores.

        } catch (errorValidacion) { // Recoge los errores que ocurrieron al validar o insertar los objetos.
            if (errorValidacion.validationErrors) { // Comprueba si Mongoose encontró errores de validación.
                errorValidacion.validationErrors.forEach((errorProducto) => { // Recorre los objetos que no pasaron la validación.
                    console.log(`Errores del objeto ${errorProducto.index + 1}:`) // Muestra la posición del objeto con errores.
                    Object.values(errorProducto.errors).forEach((error) => { // Recorre los errores de los campos de ese objeto.
                        console.log(`- Campo [${error.path}]: ${error.message}`) // Muestra el campo y el motivo de la validación fallida.
                    }) // Termina de recorrer los errores de los campos.
                }) // Termina de recorrer los objetos con errores.
            } else { // Atiende errores que no son de validación del esquema.
                throw errorValidacion // Envía el error no esperado al catch general de la función.
            } // Termina la comprobación de errores de validación.
        } // Termina el try...catch de inserción y validación.

    } catch(error) {
    
        console.error("Error General:", error.message)
    } finally {
        
        await mongoose.disconnect()
        console.log("\n Desconectado con exito de MONGODB")

    }
}

poblarBaseDatos()