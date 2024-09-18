import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
module.exports = (req: Request, res: Response, next: NextFunction) => {
  let decodedToken;
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }
    const token = authHeader.split(" ")[1];
    decodedToken = jwt.verify(token, (process.env as any).SECRET);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  next();
};
