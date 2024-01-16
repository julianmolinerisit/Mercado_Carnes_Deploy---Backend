import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Asegúrate de que la ruta sea correcta
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

export default generateAuthToken;

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  try {
    console.log('Iniciando sesión...');

    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    console.log('Usuario encontrado:', user);

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token y enviarlo en la respuesta
    const token = generateAuthToken(user);

    // Configura los encabezados CORS aquí
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Reemplaza con la dirección y el puerto de tu frontend
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Habilita el intercambio de cookies entre el frontend y el backend si es necesario

    // Configura la cookie en la respuesta
    res.setHeader('Set-Cookie', `authToken=${token}; HttpOnly; SameSite=Strict`);

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Controlador para cerrar sesión (si es necesario)
export const logoutUser = (req, res) => {
  // Puedes implementar la lógica para cerrar sesión aquí si es necesario
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};
