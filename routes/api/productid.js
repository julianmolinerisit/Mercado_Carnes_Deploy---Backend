// En tu archivo de rutas para productos
import express from "express";
import getProductById from "../../controllers/getProductId.js";

const router = express.Router();

// Rutas para productos
router.get("/:id", getProductById);

export default router;
