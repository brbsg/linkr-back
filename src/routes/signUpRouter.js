import { Router } from 'express';
import { createUser } from '../controllers/signUpController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { signUpSchema } from '../schemas/signUpSchema.js';

const signUpRouter = Router();
signUpRouter.post(
  '/sign-up',
  validateSchemaMiddleware(signUpSchema),
  createUser
);

export default signUpRouter;
