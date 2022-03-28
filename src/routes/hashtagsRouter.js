import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";


const hashtagsRouter = Router();

hashtagsRouter.get('/hashtag/:hashtag', validateTokenMiddleware, );

export default hashtagsRouter;