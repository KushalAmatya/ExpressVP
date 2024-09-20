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

const deleteTodo = async (req: Request, res: Response) => {
  await appModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted successfully" });
};

const updateTodo = async (req: Request, res: Response) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ message: "Please provide all details" });
  }

  if (!req.query.id) {
    return res.status(400).json({ message: "Please provide id" });
  }

  await appModel.findByIdAndUpdate(req.query.id, {
    title: req.body.title,
    description: req.body.description,
  });
  res.json({ message: "Todo updated successfully" });
};
export { addTodo, getTodos, deleteTodo, updateTodo };
