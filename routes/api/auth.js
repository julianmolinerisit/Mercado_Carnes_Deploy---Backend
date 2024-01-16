import express from 'express';
import { register, login, logout } from '../../controllers/userController.js';

const router = express.Router();

// Ruta para el registro de usuario
router.post('/register', register);

// Ruta para el inicio de sesión
router.post('/login', login);

// Ruta para cerrar sesión (si es necesario)
router.post('/logout', logout);

export default router;
