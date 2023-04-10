import { Router } from "express";
import { loginController, signupController } from "@controllers/auth";
const router = Router();

// @desc Register new user
// @route POST /auth/signup
router.post("/signup", signupController);

// @desc Log user in
// @route POST /auth/login
router.post("/login", loginController);

export default router;
