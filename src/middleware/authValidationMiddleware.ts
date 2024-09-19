// import { SECRET_KEY } from "./authValidationMiddleware";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRET_KEY: Secret = process.env.SECRET as Secret;

console.log("env token", SECRET_KEY, process.env.SECRET);
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req.headers", req.header);

    const token = req.header("Authorization")?.slice(7);
    console.log("header token", token);
    console.log("env token", SECRET_KEY, process.env.SECRET);

    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
