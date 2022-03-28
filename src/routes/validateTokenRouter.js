import { Router } from "express";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const validateTokenRouter = Router();

validateTokenRouter.get(
  "/validate-token",
  validateTokenMiddleware,
  (req, res) => res.sendStatus(200)
);

export default validateTokenRouter;
