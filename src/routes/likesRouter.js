import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

import { toggleLike, getLikes } from "../controllers/likesController.js";

const likesRouter = Router();
likesRouter.post('/like', validateTokenMiddleware, toggleLike);
likesRouter.post('/likes', validateTokenMiddleware, getLikes);

export default likesRouter;