import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

import { getUser, getUserPosts } from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/user", validateTokenMiddleware, getUser);
userRouter.get("/users/:id", validateTokenMiddleware, getUserPosts);

export default userRouter;
