import dbConnect from "../util/mongo.js";
import Product from "../models/Product.js";

// Obtener un producto por su ID
export const getProductById = async (req, res) => {
  const { method, query: { id } } = req;
  console.log("Product ID:", id);
  console.log("Product ID from params:", req.params); // Agrega este console.log


  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      console.log("Product found:", product);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: "Error fetching product" });
      console.error("Error fetching product:", err);
    }
  } else if (method === "PUT") {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: "Error updating product" });
    }
  } else if (method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      res.status(500).json({ error: "Error deleting product" });
    }
  }
};

// Obtener todos los productos o crear uno nuevo
export const getAllProducts = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: "Error fetching products" });
    }
  } else if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: "Error creating product" });
    }
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Error creating product" });
  }
};

// Actualizar un producto por su ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Eliminar un producto por su ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json("The product has been deleted!");
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
