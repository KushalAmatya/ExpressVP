import { Request, Response } from "express";
import { appModel, formUploadModel } from "../model/appModel";
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

const formUpload = async (req: Request, res: Response) => {
  const { personal, address } = req.body;

  const { name, age } = personal;
  const { street, city } = address;

  console.log(`Name: ${name}, Age: ${age}`);
  console.log(`Street: ${street}, City: ${city}`);
  const dataModel = new formUploadModel({
    personal: req.body.personal,
    address: req.body.address,
  });
  const isSaved = await dataModel.save();
  if (!isSaved) {
    return res.status(400).json({ message: "Data not saved" });
  } else {
    console.log("Data saved successfully");
    return res.json({ message: "Data saved successfully", personal, address });
  }
};

export { addTodo, getTodos, deleteTodo, updateTodo, formUpload };
