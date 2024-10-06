import User from "../schema/user.js";
import {
  createUserService,
  deletePostsByUserIdService,
  findUserByIdService,
  getAllUsersService,
  updateUserByIdService,
} from "../services/userService.js";

export const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userObj = { username, email, password };

    const user = await createUserService(userObj);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error caught in controller:", error);

    if (res.headersSent) {
      console.error("Headers were already sent!");
      return;
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsersService();
  return res.status(200).json({
    success: true,
    message: "All users fetched successfully",
    data: users,
  });
};

export const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const user = await findUserByIdService(id);
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
};

export const updateUserByIdController = async (req, res) => {
  const { id } = req.params;
  const updateObject = req.body;
  const user = await updateUserByIdService(id, updateObject);
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

export const deleteUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePostsByUserIdService(id);
    return res.status(200).send({
      success: true,
      message: "User and associated images/posts deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};
