import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

import {
  getUser,
  getUserName,
  getUserPosts,
  searchUsers,
} from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/user", validateTokenMiddleware, getUser);
userRouter.get("/users/:id", validateTokenMiddleware, getUserPosts);
userRouter.get("/users-name/:id", validateTokenMiddleware, getUserName);
userRouter.post("/search-users", validateTokenMiddleware, searchUsers);

export default userRouter;
