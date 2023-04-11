import { getAllUsers, getUserInformation } from "@controllers/users";
import verifyAuth from "@middlewares/verifyAuth";
import { Router } from "express";

const router = Router();

// @desc Get all useer
// @route /users/all
router.get("/all", getAllUsers);

// @desc Get user information
// @route /users/me
router.get("/me", verifyAuth, getUserInformation);

export default router;
