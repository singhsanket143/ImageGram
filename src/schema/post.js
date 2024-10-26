import mongoose from "mongoose";
import { Schema } from "zod";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      minLength: 5,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Comment",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const post = mongoose.model("Post", postSchema); // post collection

export default post;
