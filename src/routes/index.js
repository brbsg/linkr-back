import { Router } from "express";
import publishesRouter from "./publishesRouter.js";
import signUpRouter from './signUpRouter.js';
import likesRouter from "./likesRouter.js";

const router = Router();

router.use(publishesRouter);
router.use(signUpRouter);
router.use(likesRouter)

export default router;