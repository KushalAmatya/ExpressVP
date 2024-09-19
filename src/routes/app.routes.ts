import express from "express";
import { isAuth } from "../middleware/authValidationMiddleware";
const appRouter = express.Router();

appRouter.get("/", isAuth, (req, res) => {
  res.send("Hello World");
});

export default appRouter;
