// controllers/orderController.js
import dbConnect from "../util/mongo.js";
import Order from "../models/Order.js";

// Obtener una orden por su ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  await dbConnect();

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order" });
  }
};

export default getOrderById;
