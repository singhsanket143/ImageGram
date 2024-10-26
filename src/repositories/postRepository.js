import Comment, { Reply } from "../schema/comment.js";
import Post from "../schema/post.js";
import { addComment } from "./commentRepository.js";

export const createPost = async (caption, image, user) => {
  try {
    const newPost = await Post.create({
      caption,
      image,
      user,
      comments: [],
      likes: 0,
    });
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
      .limit(limit)
      .populate("user", "username email _id");
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

export const deletePostById = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const updatePostById = async (id, updateObject) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    if (updateObject.commentId) {
      const comment = await Comment.findById(updateObject.commentId).populate(
        "replies",
        ["reply", "user"]
      );
      if (!comment) {
        throw new Error("Comment not found");
      }
      if (updateObject.reply) {
        const reply = await Reply.create({
          reply: updateObject.reply,
          user: updateObject.repliedBy,
          post: id,
          comment: updateObject.commentId,
        });
        comment.replies.push(reply._id);
        await comment.save();
      }
      if (updateObject.clikes !== undefined) {
        comment.likes = updateObject.clikes;
      }
      if (updateObject.comment) {
        comment.comment = updateObject.comment;
      }
      await comment.save();
    }
    if (updateObject.comment && !updateObject.commentId) {
      const newComment = await addComment({
        postId: id,
        likes: updateObject.clikes || 0,
        userId: updateObject.user,
        commentText: updateObject.comment,
      });
    }
    const updatedPost = await Post.findByIdAndUpdate(id, updateObject, {
      new: true,
    }).populate({
      path: "comments",
      select: ["comment", "likes", "replies"],
      populate: {
        path: "replies",
        select: ["reply", "user"],
      },
    });
    return updatedPost;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update post");
  }
};
