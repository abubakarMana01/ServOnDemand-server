"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signupController = exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importStar(require("@models/User"));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error } = (0, User_1.validateLogin)(req.body);
    if (error)
        return res.status(400).json({ error: { message: error.details[0].message } });
    const user = yield User_1.default.findOne({ email }).select(["-updatedAt", "-createdAt"]);
    if (!user)
        return res.status(400).json({ error: { message: "User not found" } });
    const passwordMatches = yield bcryptjs_1.default.compare(password, user.password);
    if (!passwordMatches)
        return res.status(400).json({ error: { message: "Invalid password" } });
    res.status(200).json(user);
});
exports.loginController = loginController;
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const { error } = (0, User_1.validateSignup)(req.body);
    if (error)
        return res.status(400).json({ error: { message: error === null || error === void 0 ? void 0 : error.details[0].message } });
    const userExists = yield User_1.default.findOne({ email });
    if (userExists)
        return res.status(400).json({ error: { message: "User already exists." } });
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield User_1.default.create({ firstName, lastName, email, password: hashedPassword });
    user.save();
    res.status(201).json({ data: user });
});
exports.signupController = signupController;
