import bcryptjs from "bcryptjs";
import User, { validateLogin, validateSignup } from "@models/User";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const user = await User.findOne({ email }).select(["-updatedAt", "-createdAt"]);
  if (!user) return res.status(400).json({ error: { message: "User not found" } });

  const passwordMatches = await bcryptjs.compare(password, user.password);
  if (!passwordMatches) return res.status(400).json({ error: { message: "Invalid password" } });

  res.status(200).json(user);
};

export const signupController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const { error } = validateSignup(req.body);
  if (error) return res.status(400).json({ error: { message: error?.details[0].message } });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: { message: "User already exists." } });

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({ firstName, lastName, email, password: hashedPassword });
  user.save();

  res.status(201).json({ data: user });
};
