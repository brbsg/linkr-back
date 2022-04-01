import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { getFollowing } from "../controllers/followersController.js";
const followersRouter = Router();

followersRouter.get('/following', validateTokenMiddleware, getFollowing);

export default followersRouter;