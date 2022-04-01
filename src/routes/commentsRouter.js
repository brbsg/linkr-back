import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { postComment, getComments } from "../controllers/commentsController.js";
const commentsRouter = Router();

commentsRouter.post('/comments', validateTokenMiddleware, postComment);
commentsRouter.get('/post/:id/comments', validateTokenMiddleware, getComments);

export default commentsRouter;