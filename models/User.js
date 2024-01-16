import mongoose from "mongoose";

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Exporta el modelo User
export default mongoose.models.User || mongoose.model("User", userSchema);
