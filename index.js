
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
  res.status(200).json({
    success: true,
    message: "Api Restfull Operativa y conectada a MongoDB Atlas",
    endpoints: {
      products: "/api/products",
      users: "/api/users",
    },
  });
});

app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

export default app;
