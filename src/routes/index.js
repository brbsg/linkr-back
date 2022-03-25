import { Router } from "express";
import signInRouter from "./signInRouter.js";
import publishesRouter from "./publishesRouter.js";
import signUpRouter from "./signUpRouter.js";

const router = Router();

router.use(publishesRouter);
router.use(signUpRouter);
router.use(likesRouter)
router.use(signInRouter);

export default router;
