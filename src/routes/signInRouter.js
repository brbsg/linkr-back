import { Router } from "express";
import { signIn } from "../controllers/signInController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { signInSchema } from "../schemas/signInSchema.js";

const signInRouter = Router();

signInRouter.post("/sign-in", validateSchemaMiddleware(signInSchema), signIn);

export default signInRouter;
