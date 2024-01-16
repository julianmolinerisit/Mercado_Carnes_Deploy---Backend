import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  // Define el esquema para los productos
  title: String,
  quantity: Number,
  // Otros campos necesarios para describir un producto
});

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: Number, // Puedes ajustar el tipo según tus necesidades (String, Number, etc.)
      default: 0, // Puedes ajustar el valor predeterminado según tus necesidades
    },
    method: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: Date,
      required: true,
    },
    instructions: {
      type: String,
      maxlength: 500,
    },
    products: [ProductSchema], // Agrega la referencia a los productos
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
