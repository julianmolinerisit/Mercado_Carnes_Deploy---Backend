import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/productController.js';

const router = express.Router();

// Rutas para productos
router.get('/', getAllProducts);
router.post('/', createProduct); // Agregar esta línea para crear un producto
router.put('/:id', updateProduct); // Agregar esta línea para actualizar un producto
router.delete('/:id', deleteProduct); // Agregar esta línea para eliminar un producto

export default router;
