import "module-alias/register";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import { authRoutes } from "@routes/index";

config();
const app = express();

app.use(cors());
app.use(morgan("dev"));

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: unknown) => console.log("Could not connect to MongoDB...", err));

app.get("/healthz", (req: Request, res: Response) => {
  res.send("Server up and running...");
});

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
