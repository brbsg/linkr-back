import { Router } from "express";
import { getHashtags } from "../controllers/trendingsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const trendingsRouter = Router();

trendingsRouter.get("/trendings", validateTokenMiddleware, getHashtags);

export default trendingsRouter;