"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@models/User"));
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    res.json({ data: users });
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const signupValidationSchema = joi_1.default.object({
        firstName: joi_1.default.string().min(2).max(255).required().label("First name"),
        lastName: joi_1.default.string().min(2).max(255).required().label("Last name"),
        email: joi_1.default.string().email().required().label("Email"),
        password: joi_1.default.string().min(6).max(255).required().label("Password"),
    });
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield User_1.default.create({ firstName, lastName, email, password: hashedPassword });
    user.save();
    res.status(201).json({ data: user });
}));
exports.default = router;
