import User from "@models/User";
import { Router } from "express";
import bcryptjs from "bcryptjs";
import Joi from "joi";
const router = Router();

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const signupValidationSchema = Joi.object({
    firstName: Joi.string().min(2).max(255).required().label("First name"),
    lastName: Joi.string().min(2).max(255).required().label("Last name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(255).required().label("Password"),
  });

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({ firstName, lastName, email, password: hashedPassword });
  user.save();

  res.status(201).json({ data: user });
});

export default router;
