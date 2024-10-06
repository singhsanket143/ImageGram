import { s3, s3DeleteImage } from "../config/awsConfig.js";
import { AWS_BUCKET_NAME } from "../config/serverConfig.js";
import {
  createUser,
  deleteUserById,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUserById,
} from "../repositories/userRepository.js";
import post from "../schema/post.js";
import { deletePostByIdService } from "./postService.js";
export const createUserService = async (createUserObject) => {
  try {
    const { username, email, password } = createUserObject;
    const user = await createUser(username, email, password);
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

export const findUserByEmailService = async (email) => {
  try {
    const user = await findUserByEmail(email);
    return user;
  } catch (error) {
    return error;
  }
};

export const findUserByIdService = async (id) => {
  try {
    const user = await findUserById(id);
    return user;
  } catch (error) {
    return error;
  }
};

export const getAllUsersService = async () => {
  try {
    const users = await findAllUsers();
    return users;
  } catch (error) {
    return error;
  }
};

export const updateUserByIdService = async (id, updateObject) => {
  try {
    const user = await updateUserById(id, updateObject);
    return user;
  } catch (error) {
    return error;
  }
};

export const deletePostsByUserIdService = async (userId) => {
  try {
    const posts = await post.find({ user: userId });

    if (posts.length > 0) {
      for (const post of posts) {
        const photoKey = post.image.split("/").pop();
        s3DeleteImage(photoKey);
        await deletePostsByUserIdService(post._id);

        await deletePostByIdService(post._id);
      }
    }
    await deleteUserById(userId);
  } catch (error) {
    console.error("Error deleting posts: ", error);
    throw new Error("Error deleting user's posts");
  }
};
