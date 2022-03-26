import { Router } from 'express';
import signUpRouter from './signUpRouter.js';
import signInRouter from './signInRouter.js';
import postsRouter from './postsRouter.js';

const router = Router();

router.use(signUpRouter);
router.use(signInRouter);
router.use(postsRouter);

export default router;
