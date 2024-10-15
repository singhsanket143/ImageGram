import { s3Delete } from "../config/awsConfig.js";
import Post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
  try {
    const newPost = await Post.create({ caption, image, user });
    // const newPost = new Post({ caption, image, user });
    // await newPost.save();
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const findAllPosts = async (offset, limit) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const countAllPosts = async () => {
  try {
    const count = await Post.countDocuments();
    return count;
  } catch (error) {
    console.log(error);
  }
};

export const findPostById = async (id) => {
  try {
    const post = await Post.findById(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const updatePostById = async ({ id, image, caption }) => {
  try {
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");
    if (image) {
      await s3Delete(post.image.split("/").pop()).catch((err) =>
        console.error("Failed to delete old image:", err)
      );
      post.image = image;
    }
    if (caption) post.caption = caption;
    await post.save();
    return post;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePostById = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    const key = post.image.split("/").pop();
    console.log(key);

    await s3Delete(key);
    return post;
  } catch (error) {
    console.log(error);
  }
};
