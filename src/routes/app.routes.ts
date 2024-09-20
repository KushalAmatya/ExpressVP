import express from "express";
import { isAuth } from "../middleware/authValidationMiddleware";
import multer from "multer";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/appController";

const appRouter = express.Router();
const upload = multer({ dest: "uploads/" });
appRouter.post("/add", upload.single("image"), isAuth, addTodo);
appRouter.get("/todos", isAuth, getTodos);
appRouter.delete("/delete/:id", isAuth, deleteTodo);
appRouter.put("/update", isAuth, updateTodo);
export default appRouter;
