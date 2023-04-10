import verifyAuth from "@middlewares/verifyAuth";
import User from "@models/User";
import { Router } from "express";

const router = Router();

// @desc Get all useer
// @route /users/all
router.get("/all", async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ data: users });
});

// @desc Get user information
// @route /users/me
router.get("/me", verifyAuth, async (req, res) => {
  const { _id } = req.user as { _id: string };
  const user = await User.findOne({ _id }).select(["-password", "-updatedAt", "-createdAt"]);

  res.status(200).json({ data: user });
});

export default router;
