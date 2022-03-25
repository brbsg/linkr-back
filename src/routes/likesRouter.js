import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

import { toggleLike, getLikes } from "../controllers/likesController.js";

const likesRouter = Router();
likesRouter.post('/likes', validateTokenMiddleware, toggleLike);
likesRouter.get('/likes', validateTokenMiddleware, getLikes);

export default likesRouter;