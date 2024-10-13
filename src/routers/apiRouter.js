// This api router will be triggered when any request starting with /api comes
import express from 'express';
import v1Router from './v1/v1Router.js';
const router = express.Router();

router.use('/v1', v1Router);

export default router;