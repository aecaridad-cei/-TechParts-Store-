// Importamos mongoose usando la sintaxis de módulos ES6.
import mongoose from "mongoose";

// Constantes que hacen más legibles los estados internos de Mongoose.
const ESTADO_DESCONECTADO = 0;
const ESTADO_CONECTADO = 1;
const ESTADO_CONECTANDO = 2;

// Arrow function asíncrona reutilizable para abrir la conexión.
export const connectDB = async () => {
  // Destructuring (ES6): extraemos MONGODB_URI de process.env.
  const { MONGODB_URI } = process.env;

  // Si falta la URI, lanzamos un error claro.
  if (!MONGODB_URI) {
    throw new Error("La variable de entorno MONGODB_URI no está definida");
  }

  // Destructuring: obtenemos la conexión actual de mongoose.
  const { connection } = mongoose;

  // Si ya está conectada, reutilizamos la conexión existente.
  if (connection.readyState === ESTADO_CONECTADO) {
    return connection;
  }

  // Si se está conectando, esperamos a que termine la operación en curso.
  if (connection.readyState === ESTADO_CONECTANDO) {
    await connection.asPromise();
    return connection;
  }

  // Si está desconectada, abrimos una conexión nueva.
  await mongoose.connect(MONGODB_URI);
  return connection;
};

// Arrow function asíncrona reutilizable para cerrar la conexión.
export const disconnectDB = async () => {
  // Destructuring: obtenemos la conexión actual de mongoose.
  const { connection } = mongoose;

  // Solo desconectamos si hay una conexión abierta o en proceso.
  if (connection.readyState !== ESTADO_DESCONECTADO) {
    await mongoose.disconnect();
  }
};
