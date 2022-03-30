import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { postComment } from "../controllers/commentsController.js";
const commentsRouter = Router();

commentsRouter.post('/comments', validateTokenMiddleware, postComment);

export default commentsRouter;