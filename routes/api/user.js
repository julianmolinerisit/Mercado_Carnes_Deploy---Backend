// Rutas de autenticación
import express from 'express';
import { loginUser, registerUser, logoutUser } from '../../controllers/userController.js'; // Cambio de nombres de funciones

const router = express.Router();

// Rutas de autenticación
router.post('/login', loginUser); // Ruta para el inicio de sesión
router.post('/register', registerUser); // Ruta para el registro de usuarios
router.post('/logout', logoutUser); // Ruta para cerrar sesión (si es necesario)

export default router;


