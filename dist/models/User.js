"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        trim: true,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
const validateSignup = (data) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(2).max(255).required().label("First name"),
        lastName: joi_1.default.string().min(2).max(255).required().label("Last name"),
        email: joi_1.default.string().email().required().label("Email"),
        password: joi_1.default.string().min(6).max(255).required().label("Password"),
    });
    return schema.validate(data);
};
exports.validateSignup = validateSignup;
const validateLogin = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required().label("Email"),
        password: joi_1.default.string().min(6).max(255).required().label("Password"),
    });
    return schema.validate(data);
};
exports.validateLogin = validateLogin;
exports.default = User;
