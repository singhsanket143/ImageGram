// Here all the post related routes are present
// We look at the remaining url part after /posts
import express from "express";

import { s3uploader } from "../../config/multerConfig.js";
import {
  createPost,
  deletePostById,
  getAllPosts,
  updatePostById,
} from "../../controllers/postController.js";

const router = express.Router(); // Router object to modularize the routes

router.post("/", s3uploader.single("image"), createPost);

router.get("/", getAllPosts);

router.delete("/:id", deletePostById);

router.put("/:id", s3uploader.single("image"), updatePostById);

export default router;

// wrtie 2 apis to impl deletion of a post and update of a post
