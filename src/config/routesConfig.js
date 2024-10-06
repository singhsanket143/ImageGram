import express, { urlencoded } from "express";
import userRoutes from "../routes/userRoutes.js";
import postRoutes from "../routes/postRoutes.js";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.text());

//routes Middlewares

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

export default app;
