const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "../.env" }); // Cargar .env desde la raíz

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Rutas
const contactRoutes = require("./routes/contactRoutes"); // Ruta para el formulario de contacto
const reviewRoutes = require("./routes/reviewRoutes");  // Ruta para las reseñas
const quotationRoutes = require("./routes/quotationRoutes"); // Ruta para las cotizaciones

app.use("/api/contact", contactRoutes); // Ruta para enviar mensajes desde el formulario de contacto
app.use("/api/reviews", reviewRoutes); // Ruta para manejar las reseñas
app.use("/api/quotation", quotationRoutes); // Ruta para manejar las cotizaciones

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
