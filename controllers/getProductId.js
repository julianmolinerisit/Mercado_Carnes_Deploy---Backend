import dbConnect from "../util/mongo.js";
import Product from "../models/Product.js";

const getProductById = async (req, res) => {
  const { id } = req.params;

  await dbConnect();

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

export default getProductById;
