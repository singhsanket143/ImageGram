import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  reply: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
});
const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
});

const Comment = mongoose.model("Comment", CommentSchema);
export const Reply = mongoose.model("Reply", replySchema);
export default Comment;
