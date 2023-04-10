import User, { validateSignup, validateLogin } from "@models/User";
import { Router } from "express";
import bcryptjs from "bcryptjs";
const router = Router();

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const user = await User.findOne({ email }).select(["-updatedAt", "-createdAt"]);
  if (!user) return res.status(400).json({ error: { message: "User not found" } });

  const passwordMatches = await bcryptjs.compare(password, user.password);
  if (!passwordMatches) return res.status(400).json({ error: { message: "Invalid password" } });

  res.status(200).json(user);
});

export default router;
