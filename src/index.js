import express from "express";
import connectDB from "./config/dbConfig.js";
import routes from "./config/routesConfig.js";
const PORT = 3000; // port number

const app = express(); // create express app server instance

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

// READ All posts, Delete post, Update post, Read single post
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
