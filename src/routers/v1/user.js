// After /users the remainaing part of url is handled here
import express from 'express';
import { getProfile, signin, signup } from '../../controllers/userController.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidator.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const router = express.Router();

router.get('/profile', getProfile);
router.post('/signup', validate(zodSignupSchema), signup);
router.post('/signin', validate(zodSigninSchema), signin);

export default router;