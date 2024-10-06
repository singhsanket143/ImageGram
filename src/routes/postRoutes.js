import express from "express";
import { s3uploader } from "../config/multerConfig.js";
import {
  createPost,
  deletePostById,
  getAllPosts,
} from "../controllers/postController.js";
import post from "../schema/post.js";

const app = express();

app.get("/", getAllPosts);
app.post("/:userId/create-post", s3uploader.single("image"), createPost);
app.delete("/:id", deletePostById);
export default app;
