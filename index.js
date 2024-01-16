
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbConnect from './util/mongo.js';
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

app.use(express.json());

// Configura CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: 'https://mercado-carnes-deploy-frontend.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifica los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Especifica los encabezados permitidos
  })
);


app.use(cookieParser()); 

// Importa tus rutas aquí (usando import)
import newsRoute from './routes/api/news.js';
import ordersRoute from './routes/api/orders.js';
import productsRoute from './routes/api/products.js';
import loginRoute from './routes/api/user.js'; 
import productidRoute from './routes/api/productid.js'; 
import getNewsByIdRoute from "./routes/api/newsid.js"; 
import getOrderById from './routes/api/orderid.js'; 

// Usa tus rutas
app.use('/api/news', newsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/products', productsRoute);
app.use('/api/user', loginRoute); 
app.use('/api/productid', productidRoute); 
app.use('/api/news/id', getNewsByIdRoute); 
app.use('/api/orderid', getOrderById); 

// Middleware de manejo de errores personalizado
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err);

  let statusCode = 500;
  let errorMessage = 'Error interno del servidor';

  if (err instanceof MyCustomError) {
    statusCode = 400; 
    errorMessage = err.message;
  }

  res.status(statusCode).json({ message: errorMessage });
});

class MyCustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MyCustomError';
  }
}

app.listen(port, async () => {
  try {
    await dbConnect();
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});

// Mercado pago API
app.get("/payment/success", (req, res) => {
  try {
    if (req.query.status === 'approved') {
      res.status(200).send('Pago aprobado. Gracias por tu compra.');
    } else {
      res.status(200).send('Pago no aprobado.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al manejar el éxito del pago",
    });
  }
});

app.post("/create_preference", async (req, res) => {
  try {
    const items = req.body.products.map(product => ({
      title: product.title,
      quantity: Number(product.quantity),
      unit_price: Number(product.price),
      currency_id: "ARS",
    }));

    const body = {
      items,
      back_urls: {
        success: "http://localhost:3001/payment/success",
        failure: "http://localhost:3001/cart/failure",
        pending: "http://localhost:3001/cart/pending",
      },
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});
