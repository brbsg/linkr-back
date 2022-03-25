import { Router } from "express";
import { getHashtags } from "../controllers/trendingsController";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware";

const trendingsRouter = Router();

trendingsRouter.post("/trendings", validateTokenMiddleware, getHashtags);

export default trendingsRouter;