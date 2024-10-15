import {
  countAllPosts,
  createPost,
  deletePostById,
  findAllPosts,
  updatePostById,
} from "../repositories/postRepository.js";

export const createPostService = async (createPostObejct) => {
  const caption = createPostObejct.caption?.trim();
  const image = createPostObejct.image;
  // const user = createPostObejct.user; add later

  const post = await createPost(caption, image);

  return post;
};

export const getAllPostsService = async (offset, limit) => {
  const posts = await findAllPosts(offset, limit);

  // Calculate total number of posts and total number of pages
  const totalDocuments = await countAllPosts();

  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    posts,
    totalPages,
    totalDocuments,
  };
};

export const deletePostByIdService = async (id) => {
  const post = await deletePostById(id);
  return post;
};

export const updatePostByIdService = async (reqObject) => {
  return await updatePostById(reqObject);
};
