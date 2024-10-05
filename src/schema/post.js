import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    file: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const post = mongoose.model("Post", postSchema);

export default post;
