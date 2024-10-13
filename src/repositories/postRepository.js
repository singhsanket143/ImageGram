import Post from "../schema/post.js";
import User from "../schema/user.js";

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

export const findAllPosts = async (page, limit) => {
  try {
    const next = (page - 1) * limit;

    const posts = await Post.find()
      .limit(limit)
      .skip(next)
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments();

    return {
      page,
      limit,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      data: posts,
    };
  } catch (error) {
    console.log(error);
    throw error;
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

export const updatePostById = async (id, updateObject) => {
  try {
    const post = await Post.findByIdAndUpdate(id, updateObject, { new: true });
    return post;
  } catch (error) {
    console.log(error);
  }
};
export const deletePostById = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    const user = await User.findById(post.user);
    await user.posts.pop(post._id);
    await user.save();
    console.log(post);

    return post;
  } catch (error) {
    console.log(error);
  }
};
