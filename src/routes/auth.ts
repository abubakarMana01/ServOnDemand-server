import User, { validateSignup } from "@models/User";
import { Router } from "express";
import bcryptjs from "bcryptjs";
const router = Router();

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});

router.post("/signup", async (req, res) => {
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
});

export default router;
