import { Request, Response } from "express";
import { appModel, formUploadModel } from "../model/appModel";
import { CustomRequest } from "../middleware/authValidationMiddleware";
const addTodo = async (req: Request, res: Response) => {
  const userId = (req as CustomRequest).token.userId;

  const dataModel = new appModel({
    userId,
    title: req.body.title,
    description: req.body.description,
  });

  await dataModel.save();
  res.json({ message: "Todo added successfully" });
};

const getTodos = async (req: Request, res: Response) => {
  const userId = (req as CustomRequest).token.userId;
  const todos = await appModel.find({ userId });

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
  console.log("inside");

  const { personal, address } = req.body;

  console.log(req);

  const { name, age } = personal;
  const { street, city } = address;
  console.log(`Name: ${name}, Age: ${age}`);
  console.log(`Street: ${street}, City: ${city}`);
  const dataModel = new formUploadModel({
    personal: {
      name,
      age,
      photo: req.file?.path,
    },
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

const getFormData = async (req: Request, res: Response) => {
  const formData = await formUploadModel.find({});
  res.json(formData);
};

export { addTodo, getTodos, deleteTodo, updateTodo, formUpload, getFormData };
