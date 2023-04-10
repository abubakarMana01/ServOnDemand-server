"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@controllers/auth");
const router = (0, express_1.Router)();
router.post("/signup", auth_1.signupController);
router.post("/login", auth_1.loginController);
exports.default = router;
