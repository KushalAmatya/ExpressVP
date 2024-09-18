import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authToken = jwt.sign(
    { email: email, password: password },
    process.env.SECRET as string,
    { expiresIn: "1h" }
  );
  console.log(authToken);
  res.json({ email, password, authToken });
};

const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  res.json({ name, email, password });
};

export { login, register };
