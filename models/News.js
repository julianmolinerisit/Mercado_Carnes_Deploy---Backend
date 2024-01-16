import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    subtitle: {
      type: String, // Agregar el campo de subtítulo
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // Referencia a la imagen
    },
    // Otros campos que desees agregar
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model("News", NewsSchema);
