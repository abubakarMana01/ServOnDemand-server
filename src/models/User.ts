import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export const validateSignup = (data: unknown) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(255).required().label("First name"),
    lastName: Joi.string().min(2).max(255).required().label("Last name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(255).required().label("Password"),
  });
  return schema.validate(data);
};

export const validateLogin = (data: unknown) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(255).required().label("Password"),
  });
  return schema.validate(data);
};

export default User;
