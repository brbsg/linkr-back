import { Router } from "express";
import signInRouter from "./signInRouter.js";
import signUpRouter from "./signUpRouter.js";

const router = Router();
router.use(signUpRouter);
router.use(signInRouter);

export default router;
