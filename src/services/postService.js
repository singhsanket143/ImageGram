import { API_KEY, API_SECRET } from "../config/serverConfig.js";
import { createPost } from "../repositories/postRepository.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ImageGram",
  api_key: API_KEY,
  api_secret: API_SECRET,
});
export const createPostService = async (createPostObejct) => {
  const { image, caption, user } = createPostObejct;
  const uploadResponse = await cloudinary.uploader.upload(image, {
    use_filename: true,
  });
  const imageUrl = uploadResponse.secure_url;
  const post = await postRepository.createPost(caption, imageUrl, user);
  return post;
};
