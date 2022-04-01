import { Router } from "express";
import signUpRouter from "./signUpRouter.js";
import signInRouter from "./signInRouter.js";
import postsRouter from "./postsRouter.js";
import trendingsRouter from "./trendingsRouter.js";
import likesRouter from "./likesRouter.js";
import userRouter from "./userRouter.js";
import validateTokenRouter from "./validateTokenRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";
import commentsRouter from "./commentsRouter.js";
import followingRouter from "./followingRouter.js";

const router = Router();

router.use(signUpRouter);
router.use(trendingsRouter);
router.use(likesRouter);
router.use(signInRouter);
router.use(userRouter);
router.use(postsRouter);
router.use(validateTokenRouter);
router.use(hashtagsRouter);
router.use(commentsRouter)
router.use(followingRouter)

export default router;
