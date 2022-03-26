import { Router } from 'express';
import signUpRouter from './signUpRouter.js';
import signInRouter from './signInRouter.js';
import postsRouter from './postsRouter.js';
import likesRouter from "./likesRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(signUpRouter);
router.use(likesRouter)
router.use(signInRouter);
router.use(userRouter)
router.use(postsRouter);


export default router;
