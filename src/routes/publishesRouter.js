import { Router } from "express";
import { getAllPosts, postPublish, } from "../controllers/publishesController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import publicationSchema from "../schemas/validatePublish.js";

const publishesRouter = Router();

publishesRouter.post("/timeline/publish", validateTokenMiddleware, validateSchemaMiddleware(publicationSchema), postPublish);
publishesRouter.post("/timeline/posts", validateTokenMiddleware, getAllPosts);
export default publishesRouter;