// routes/api/news.js

import express from 'express';
import {
  getNewsById,
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} from '../../controllers/newsController.js';

const router = express.Router();

// Rutas para noticias
router.get('/:id', getNewsById);
router.get('/', getAllNews);
router.post('/', createNews); // Agregar esta línea para crear una noticia
router.put('/:id', updateNews); // Agregar esta línea para actualizar una noticia
router.delete('/:id', deleteNews); // Agregar esta línea para eliminar una noticia

export default router;
