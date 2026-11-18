import mongoose from "mongoose";

const CATEGORIES = [
  "Procesadores",
  "Tarjetas Gráficas",
  "Memorias RAM",
  "Almacenamiento",
];

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "The name must contain at least 4 characters"],
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: CATEGORIES,
        message: "{VALUE} is not a valid category",
      },
    },
    price: {
      type: Number,
      required: true,
      min: [0, "The price cannot be negative"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "The stock cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer",
      },
    },
    compatibleWith: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;