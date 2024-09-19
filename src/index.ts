import express, { Express } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import appRouter from "./routes/app.routes";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/", appRouter);
mongoose.connect(process.env.DB as string).then(() => {
  console.log("Connected to the database");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
