import dbConnect from "../util/mongo.js";
import Order from "../models/Order.js";

const getOrderById = async (req, res) => {
  const {
    query: { id },
  } = req;

  await dbConnect();

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: newStatus }, // Actualiza el estado del pedido según el nuevo estado proporcionado
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateOrderStatus = async (req, res) => {
  const {
    params: { id },
    body: { newStatus }, // Suponiendo que el nuevo estado se pasa en el cuerpo de la solicitud
  } = req;

  await dbConnect();

  if (req.method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (req.method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

const deleteOrder = async (req, res) => {
  const {
    params: { id },
  } = req;

  await dbConnect();

  if (req.method === "DELETE") {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      res.status(200).json({ message: "Orden eliminada exitosamente" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

const getAllOrders = async (req, res) => {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Ordena las órdenes por fecha de creación descendente
      const orders = await Order.find().sort({ createdAt: -1 });

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (req.method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

const createOrder = async (req, res) => {
  try {
    const { products, ...orderData } = req.body; // Extrae los productos y otros datos de la solicitud
    const order = await Order.create({ ...orderData, products });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Agrega esto en tu archivo controllers/orders.js
const updatePaymentStatus = async (req, res) => {
  const {
    params: { id },
    body: { paymentStatus },
  } = req;

  await dbConnect();

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};




export { getOrderById, getAllOrders, deleteOrder, updateOrderStatus, createOrder, updatePaymentStatus };
