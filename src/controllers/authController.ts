import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authUser from "../model/authModel";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await authUser.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const passwordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const authToken = jwt.sign(
      { email: existingUser.email, userId: existingUser._id },
      process.env.SECRET as string,
      { expiresIn: "1d" }
    );

    console.log(authToken);

    res.json({ authToken });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
};

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await authUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new authUser({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", email });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
};

export { login, register };
