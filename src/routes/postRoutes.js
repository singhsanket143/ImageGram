import express from "express";
import { s3uploader } from "../config/multerConfig.js";
import { createPost } from "../controllers/postController.js";

const app = express();

app.post("/create-post", s3uploader.single("image"), createPost);

export default app;
