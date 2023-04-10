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
const verifyAuth_1 = __importDefault(require("@middlewares/verifyAuth"));
const User_1 = __importDefault(require("@models/User"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// @desc Get all useer
// @route /users/all
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    return res.status(200).json({ data: users });
}));
// @desc Get user information
// @route /users/me
router.get("/me", verifyAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const user = yield User_1.default.findOne({ _id }).select(["-password", "-updatedAt", "-createdAt"]);
    res.status(200).json({ data: user });
}));
exports.default = router;
