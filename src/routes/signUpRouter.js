import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { signUpSchema } from '../schemas/signUpSchema.js';

const signUpRouter = Router();
signUpRouter.post('/sign-up', validateSchemaMiddleware(signUpSchema));

export default signUpRouter;
