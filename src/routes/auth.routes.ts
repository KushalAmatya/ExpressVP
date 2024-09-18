import express from "express";
import { login, register } from "../controllers/authController";
import { validateData } from "../middleware/validationMiddleware";
import { authRegistrationSchema, authLoginSchema } from "../schemas/authSchema";
const authRouter = express.Router();

authRouter.post("/login", validateData(authLoginSchema), login);

authRouter.post("/register", validateData(authRegistrationSchema), register);

export default authRouter;
