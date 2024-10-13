import { s3, s3DeleteImage } from "../config/awsConfig.js";
import { AWS_BUCKET_NAME } from "../config/serverConfig.js";
import {
  createPostService,
  deletePostByIdService,
  findAllPostsService,
  findPostByIdService,
} from "../services/postService.js";

export async function createPost(req, res) {
  const post = await createPostService({
    caption: req.body.caption,
    image: req.file.location,
    user: req.params.userId,
  });

  return res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
}

export async function getAllPosts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const posts = await findAllPostsService(page, limit);
  return res.status(200).json({
    success: true,
    message: "All posts fetched successfully",
    data: posts,
  });
}

export async function getPostById(req, res) {
  const post = await findPostByIdService(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Post fetched successfully",
    data: post,
  });
}
export async function updatePostById(req, res) {
  const post = await updatePostByIdService(req.params.id, req.body);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  const updatedPost = await updatePostByIdService(req.params.id, req.body);
  return res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: updatedPost,
  });
}

export async function deletePostById(req, res) {
  try {
    const post = await findPostByIdService(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const photoKey = post.image.split("/").pop();
    s3DeleteImage(photoKey);

    await deletePostByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Post and associated image deleted successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error deleting post",
      error: error.message,
    });
  }
}
