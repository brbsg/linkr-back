import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

import { getUser } from "../controllers/userController.js";

const userRouter = Router();
userRouter.get('/user', validateTokenMiddleware, getUser);

export default userRouter;