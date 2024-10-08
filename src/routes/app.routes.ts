import express from "express";
import { isAuth } from "../middleware/authValidationMiddleware";
import multer from "multer";
import {
  addTodo,
  deleteTodo,
  formUpload,
  getFormData,
  getTodos,
  updateTodo,
} from "../controllers/appController";
import { appSchema } from "../schemas/appSchema";
import { validateData } from "../middleware/validationMiddleware";

const appRouter = express.Router();
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1000000,
  },
});
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
appRouter.get("/getformdata", isAuth, getFormData);
export default appRouter;
