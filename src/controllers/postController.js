import { createPostService } from "../services/postService.js";

export async function createPost(req, res) {
  const post = await createPostService({
    caption: req.body.caption,
    image: req.file.location,
  });

  return res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
}
