import express, { Express } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
