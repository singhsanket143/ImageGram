// After /users the remainaing part of url is handled here
import express from "express";
import {
  getAllUsers,
  getProfile,
  getSingleUser,
  signin,
  signup,
} from "../../controllers/userController.js";
import { zodSignupSchema } from "../../validators/zodSignupSchema.js";
import { validate } from "../../validators/zodValidator.js";
import { zodSigninSchema } from "../../validators/zodSigninSchema.js";

const router = express.Router();

router.get("/profile", getProfile);
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Signup a new user
 *      description: Signup a new user
 *
 */
router.post("/signup", validate(zodSignupSchema), signup);

/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 *
 */
router.post("/signin", validate(zodSigninSchema), signin);

router.get("/:id", getSingleUser);

export default router;
