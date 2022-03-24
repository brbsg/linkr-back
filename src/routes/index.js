import { Router } from "express";
import publishesRouter from "./publishesRouter.js";

const router = Router();

router.use(publishesRouter);

export default router;