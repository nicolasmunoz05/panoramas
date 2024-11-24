import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

import eventoRoutes from "./routes/eventoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import panoramaRoutes from "./routes/panoramaRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import modRoutes from "./routes/modRoutes.js";
import longinRoutes from "./routes/loginRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authContRoutes from "./routes/authContRoutes.js";
import favoritoRoutes from "./routes/favoritoRoutes.js";
// import placeRoutes from "./routes/placeRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const puerto = process.env.APP_PORT;
const host = process.env.APP_HOST;

app.use(cors());

app.use(express.json());

app.use("/evento", eventoRoutes);
app.use("/usuario", usuarioRoutes);

app.use("/panorama", panoramaRoutes);
app.use("/admin", adminRoutes);
app.use("/categoria", categoriaRoutes);
app.use("/mod", modRoutes);
// app.use('/places', placeRoutes);
app.use("/public", express.static(`${__dirname}/uploads`));
app.use("/login", longinRoutes);
app.use("/auth", authContRoutes);
app.use("/favorito", favoritoRoutes);


app.get("/", (req, res) => {
  res.send("Opa nico");
});

// MongoDB conexión
mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("Conectada la bd"))
  .catch((error) => console.error(error));

app.listen(puerto, () => {
  console.log(`El servidor está arreglado y listo papu, ${host}:${puerto}`);
});
