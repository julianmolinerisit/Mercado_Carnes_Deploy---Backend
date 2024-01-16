import express from "express";
import getOrderById from "../../controllers/getOrderId.js";

const router = express.Router();

// Rutas para productos
router.get('/:id', getOrderById);

export default router;
