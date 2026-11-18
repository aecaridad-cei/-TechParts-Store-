import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is required");
  }

  if (mongoose.connection.readyState === 2) {
    return mongoose.connection.asPromise();
  }

  if (mongoose.connection.readyState === 0) {
    connectionPromise = mongoose
      .connect(uri)
      .then((connection) => {
        console.log(`MongoDB Atlas conectado en: ${connection.connection.host}`);
        return connection.connection;
      })
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
    return connectionPromise;
  }

  return mongoose.connection.asPromise();
};

export default connectDB;
