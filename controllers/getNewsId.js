// controllers/getNewsById.js

import dbConnect from "../util/mongo.js";
import News from "../models/News.js";

const getNewsById = async (req, res) => {
  const { id } = req.params;

  await dbConnect();

  try {
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }

    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: "Error fetching news" });
  }
};

export default getNewsById;
