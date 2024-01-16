import express from 'express';
import { getOrderById, getAllOrders, updateOrderStatus, deleteOrder, createOrder,updatePaymentStatus  } from '../../controllers/orderController.js';

const router = express.Router();

// Rutas para pedidos
router.get('/:id', getOrderById);
router.get('/', getAllOrders);
router.post('/', createOrder); // Ruta para crear una orden
router.delete('/:id', deleteOrder);
router.put('/:id', updateOrderStatus);
router.put('/updatePaymentStatus/:id', updatePaymentStatus);


export default router;
