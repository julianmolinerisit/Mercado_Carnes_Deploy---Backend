// routes/api/getNewsById.js

import express from "express";
import getNewsById from "../../controllers/getNewsId.js";

const router = express.Router();

// Rutas para noticias por ID
router.get("/:id", getNewsById);

export default router;
