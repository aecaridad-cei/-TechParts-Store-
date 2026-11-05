// Importamos mongoose para poder gestionar la conexión con MongoDB.
import mongoose from "mongoose";

// Función reutilizable que abre la conexión con MongoDB.
// Se usa desde el seed, las consultas y la API.
export async function connectDB() {
  // Comprobamos que la variable MONGODB_URI exista en el archivo .env.
  if (!process.env.MONGODB_URI) {
    // Si no existe, lanzamos un error claro para saber qué falta.
    throw new Error("La variable de entorno MONGODB_URI no está definida");
  }

  // readyState 1 significa que ya hay una conexión activa.
  if (mongoose.connection.readyState === 1) {
    // Devolvemos la conexión existente para no abrir otra innecesariamente.
    return mongoose.connection;
  }

  // readyState 2 significa que Mongoose se está conectando en este momento.
  if (mongoose.connection.readyState === 2) {
    // Esperamos a que termine la conexión que ya está en curso.
    await mongoose.connection.asPromise();
    // Devolvemos la conexión ya establecida.
    return mongoose.connection;
  }

  // Si no hay conexión, creamos una nueva usando la URI del entorno.
  await mongoose.connect(process.env.MONGODB_URI);
  // Devolvemos la conexión para que quien llame a la función pueda usarla.
  return mongoose.connection;
}

// Función reutilizable para cerrar la conexión con MongoDB.
export async function disconnectDB() {
  // readyState 0 significa que no hay ninguna conexión abierta.
  if (mongoose.connection.readyState !== 0) {
    // Solo desconectamos si realmente hay una conexión activa.
    await mongoose.disconnect();
  }
}
