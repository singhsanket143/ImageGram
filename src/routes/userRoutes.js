import express from "express";
import { authConfig, loginUser } from "../config/authConfig.js";
import {
  createUserController,
  deleteUserByIdController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", authConfig, createUserController);
router.post("/login", loginUser);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserByIdController);
router.delete("/:id", deleteUserByIdController);

export default router;
