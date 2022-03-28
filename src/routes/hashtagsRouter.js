import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { getPostsByHashtag } from "../controllers/hashtagsController.js";

const hashtagsRouter = Router();

hashtagsRouter.get('/hashtag/:hashtag', validateTokenMiddleware, getPostsByHashtag);

export default hashtagsRouter;