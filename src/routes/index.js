import { Router } from "express";
import publishesRouter from "./publishesRouter";

const router = Router();

router.use(publishesRouter);

export default router;