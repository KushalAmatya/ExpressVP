import { Request, Response } from "express";
import { appModel } from "../model/appModel";
const addTodo = async (req: Request, res: Response) => {
  const dataModel = new appModel({
    title: req.body.title,
    description: req.body.description,
  });
  await dataModel.save();
  res.json({ message: "Todo added successfully" });
};

const getTodos = async (req: Request, res: Response) => {
  const todos = await appModel.find({});
  res.json(todos);
};

export { addTodo, getTodos };
