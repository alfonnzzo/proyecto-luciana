import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startDB } from "./src/config/database.js";

const port = process.env.PORT || 6767;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.listen(port, async () => {
  await startDB();
  console.log("Servidor ejecutándose en el puerto", port);
});
