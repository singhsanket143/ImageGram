import {
  createPost,
  deletePostById,
  findAllPosts,
  findPostById,
} from "../repositories/postRepository.js";
import { findUserById } from "../repositories/userRepository.js";
export const createPostService = async (createPostObejct) => {
  const caption = createPostObejct.caption?.trim();
  const image = createPostObejct.image;
  const user = createPostObejct.user;

  const userData = await findUserById(user);

  const post = await createPost(caption, image, user);

  await userData.updateOne({ $push: { posts: post } });

  return post;
};
export const findAllPostsService = async (page, limit) => {
  const posts = await findAllPosts(page, limit);
  return posts;
};

export const findPostByIdService = async (id) => {
  const post = await findPostById(id);
  return post;
};

export const updatePostByIdService = async (id, updateObject) => {
  try {
    const post = await updatePostById(id, updateObject);
    return post;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error(error.message);
  }
};
export const deletePostByIdService = async (id) => {
  try {
    const post = await deletePostById(id);
    return post;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error(error.message);
  }
};
