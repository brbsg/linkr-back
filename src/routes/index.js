import { Router } from "express";
import publishesRouter from "./publishesRouter.js";
import signUpRouter from './signUpRouter.js';
import trendingsRouter from "./trendingsRouter.js";

const router = Router();

router.use(publishesRouter);
router.use(signUpRouter);
router.use(trendingsRouter);

export default router;