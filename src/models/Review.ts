import Joi from "joi";
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      min: 0,
      max: 0,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model("Review", reviewSchema);

export const validateReview = (data: unknown) => {
  const schema = Joi.object({
    customerId: Joi.string().trim().required().label("Customer ID"),
    workerId: Joi.string().trim().required().label("Worker ID"),
    comment: Joi.string().max(1000).required().label("Comment"),
  });

  return schema.validate(data);
};

export default Review;
