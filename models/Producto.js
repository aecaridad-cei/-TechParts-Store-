import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
            minlength: [4, 'EL nombre debe tener como minimos 4 caracteres']
        },
        categoria: {
            type: String,
            required: true,
            enum: 
            {
                values: ['Procesadores', 'Tarjetas Gráficas', 'Memorias RAM', 'Almacenamiento'],
                message: '{VALUE}, no es una categoria valida'
            }
        },
        precio: {
            type: Number,
            required: true,
            min: [0, 'El precio no puede ser negativo'],
            default: 0
        },
        stock: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} no es un número entero.'
            },
            default: 0
        },
        compatibleCon: {
            type: [String],
            default: []
        },
        destacado: {
            type: Boolean,
            default: false
        },
}, { timestamps: true }
)

const Producto = mongoose.models.Producto || mongoose.model("Producto", productoSchema)
//Mongoose usa "Producto" como nombre del modelo y, por defecto, lo convierte en el nombre plural y en minúsculas para la colección: productos.

export default Producto