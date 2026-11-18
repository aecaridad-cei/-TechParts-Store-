import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Evita abrir otra conexión si Mongoose ya está conectando o conectado.
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    // MONGODB_URI se obtiene del entorno; así no se guarda la credencial en el código.
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Atlas conectado en: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    // Sin base de datos la API no puede atender sus operaciones principales.
    process.exit(1);
  }
};

export default connectDB;
