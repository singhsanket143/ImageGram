import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      validate: {
        validator: function (emailValue) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            emailValue
          );
        },
        message: "Invalid email format",
      },
    },
    posts: [{ type: mongoose.Schema.Types.Mixed, ref: "Post" }],
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); // user collection

export default User;
