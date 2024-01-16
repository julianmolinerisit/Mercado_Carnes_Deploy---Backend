// controllers/newsController.js

import dbConnect from "../util/mongo.js";
import News from "../models/News.js";

// Obtener todas las noticias
export const getAllNews = async (req, res) => {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const newsList = await News.find();
      res.status(200).json(newsList);
    } else if (req.method === "POST") {
      const news = await News.create(req.body);
      res.status(201).json(news);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Obtener una noticia por su ID
export const getNewsById = async (req, res) => {
  const { id } = req.params; // Utiliza req.params para obtener el ID

  await dbConnect();

  try {
    if (req.method === "GET") {
      const news = await News.findById(id);
      if (!news) {
        return res.status(404).json({ message: "Noticia no encontrada" });
      }
      res.status(200).json(news);
    } else if (req.method === "PUT") {
      const news = await News.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(news);
    } else if (req.method === "DELETE") {
      const news = await News.findByIdAndDelete(id);
      if (!news) {
        return res.status(404).json({ message: "Noticia no encontrada" });
      }
      res.status(200).json({ message: "Noticia eliminada exitosamente" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Crear una nueva noticia
export const createNews = async (req, res) => {
  await dbConnect();

  try {
    if (req.method === "POST") {
      const news = await News.create(req.body);
      res.status(201).json(news);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Actualizar una noticia por su ID
export const updateNews = async (req, res) => {
  const { id } = req.params; // Utiliza req.params para obtener el ID

  await dbConnect();

  try {
    if (req.method === "PUT") {
      const news = await News.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(news);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Eliminar una noticia por su ID
export const deleteNews = async (req, res) => {
  const { id } = req.params; // Utiliza req.params para obtener el ID

  await dbConnect();

  try {
    if (req.method === "DELETE") {
      const news = await News.findByIdAndDelete(id);
      if (!news) {
        return res.status(404).json({ message: "Noticia no encontrada" });
      }
      res.status(200).json({ message: "Noticia eliminada exitosamente" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
