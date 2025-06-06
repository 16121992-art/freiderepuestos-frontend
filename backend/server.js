import express from "express";
import config from "./config.js";
import mongoose from "mongoose";

const app = express();

mongoose.connect(config.mongoUri)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.log("Error al conectar a MongoDB:", error));

app.listen(process.env.PORT || 10000, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT || 10000}`);
});