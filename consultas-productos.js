import mongoose from "mongoose"
import dotenv from "dotenv"
import Producto from "./models/Producto.js"

dotenv.config()

async function ejecutarConsultas() {
    
    try {

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("=== Laboratorio de Consultas ===")

        const productoTarjetaGraficas = await Producto.find({
            categoria: "Tarjetas Gráficas",
            stock: {$gte: 0}
        })
        console.log("1. Tarjetas Gráficas disponibles: ", productoTarjetaGraficas.length)
        console.log(productoTarjetaGraficas)

        const productosEconomicos = await Producto.find({
            precio: {$lte: 150}
        }).select("nombre precio categoria -_id")
        console.log("\n2.Productos por 150EUR o menos(solo nombre, precio y categoria)")
        console.table(productosEconomicos.map(c =>  c.toObject()))

        const productoPorTag = await Producto.find({
            compatibleCon: {$in: "PCIe 4.0"}
        }).select("nombre compatibleCon -_id")
        console.log("\n3. Productos compatibles con PCIe 4.0")
        console.log(productoPorTag)

        const productosAvanzado = await Producto.find({
            destacado: true
        })
        .sort({precio: -1})
        .limit(3)
        .select("nombre precio -_id")
        console.log("\n4. Top productos destacados ordenados por precio:")
        console.log(productosAvanzado)

    } catch (error) {
        console.error("Error en las consultas: ", error.menssage)
    } finally {
        await mongoose.disconnect()
        console.log("\n Desconectado con exito de MONGODB")
    }
}

ejecutarConsultas()