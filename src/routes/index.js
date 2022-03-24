import { Router } from 'express';
import signUpRouter from './signUpRouter.js';

const router = Router();
router.use(signUpRouter);

export default router;
