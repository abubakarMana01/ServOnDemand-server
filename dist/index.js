"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const index_1 = require("@routes/index");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
mongoose_1.default
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => console.log("Could not connect to MongoDB...", err));
app.get("/healthz", (req, res) => {
    res.send("Server up and running...");
});
app.use("/auth", index_1.authRoutes);
app.use("/users", index_1.usersRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
