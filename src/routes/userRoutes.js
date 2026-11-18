
import express from "express";

import {
  getAllUsers,
  getUserById,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
