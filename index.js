
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";
import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import {
  notFound,
  errorHandler,
} from "./src/middleware/errorMiddleware.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Api Restfull Operativa y conectada a MongoDB Atlas");
});

// Rutas de productos
app.use("/api/products", productRoutes);

// Rutas de usuarios
app.use("/api/users", userRoutes);

// Middleware de errores
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("Servidor ejecutandose en localhost");
  });
}

export default app;
