import { findUserByEmailService } from "../services/userService.js";

export const authConfig = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await findUserByEmailService(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error,
    });
  }
  next();
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmailService(email);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    } else if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist",
      });
    } else if (existingUser.email !== email) {
      return res.status(400).json({
        success: false,
        message: "Email does not match",
      });
    } else if (existingUser.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error,
    });
  }
  next();
};
