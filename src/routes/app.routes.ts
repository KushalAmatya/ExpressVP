import express from "express";
import { isAuth } from "../middleware/authValidationMiddleware";
import { addTodo, getTodos } from "../controllers/appController";
const appRouter = express.Router();

appRouter.post("/add", isAuth, addTodo);
appRouter.get("/todos", isAuth, getTodos);
export default appRouter;
