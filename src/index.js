import express from "express";
import connectDB from "./config/dbConfig.js";
import { createPostService } from "./services/postService.js";
import { createUserService } from "./services/userService.js";

const PORT = 3000; // port number

const app = express(); // create express app server instance

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

app.post("/post", createPostService);
app.post("/user", createUserService);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
