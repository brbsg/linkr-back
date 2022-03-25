import { Router } from "express";
import publishesRouter from "./publishesRouter.js";
import signUpRouter from './signUpRouter.js';

const router = Router();

router.use(publishesRouter);
router.use(signUpRouter);

export default router;
