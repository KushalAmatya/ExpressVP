import express from "express";
import { isAuth } from "../middleware/authValidationMiddleware";
import multer from "multer";
import {
  addTodo,
  deleteTodo,
  formUpload,
  getTodos,
  updateTodo,
} from "../controllers/appController";
import { appSchema } from "../schemas/appSchema";
import { validateData } from "../middleware/validationMiddleware";

const appRouter = express.Router();
const upload = multer({ dest: "uploads/" });
appRouter.post("/add", upload.single("image"), isAuth, addTodo);
appRouter.get("/todos", isAuth, getTodos);
appRouter.delete("/delete/:id", isAuth, deleteTodo);
appRouter.put("/update", isAuth, updateTodo);
appRouter.post(
  "/formdata",
  upload.single("image"),
  validateData(appSchema),
  formUpload
);
export default appRouter;
