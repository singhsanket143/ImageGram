import {
  createUserService,
  deleteUserByIdService,
  findUserByIdService,
  getAllUsersService,
  updateUserByIdService,
} from "../services/userService.js";

export const createUserController = async (req, res) => {
  const { username, email, password } = req.body;
  const userObj = { username, email, password };
  const user = await createUserService(userObj);
  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
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
  const { id } = req.params;
  const user = await deleteUserByIdService(id);
  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: user,
  });
};
