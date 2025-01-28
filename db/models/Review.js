const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: String, required: true },
  },
  { timestamps: true } // Guarda automáticamente fechas de creación y actualización
);

module.exports = mongoose.model("Review", reviewSchema);
