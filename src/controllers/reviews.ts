import Review, { validateReview } from "@models/Review";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export const getHandymanReviewsController = async (req: Request, res: Response) => {
  const { workerId } = req.params;

  const isValidId = isValidObjectId(workerId);
  if (!isValidId) return res.status(400).json({ error: { message: "Invalid worker id" } });

  const reviews = await Review.find({ worker: workerId }).populate("customer worker");

  res.status(200).json({ data: { reviews } });
};

export const addHandymanReviewController = async (req: Request, res: Response) => {
  const { workerId, comment, rating } = req.body;
  const { _id: customerId } = req.user as { _id: string };

  const { error } = validateReview(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const isCusomerIdValid = isValidObjectId(customerId);
  const isWorkerIdValid = isValidObjectId(workerId);

  if (!isCusomerIdValid || !isWorkerIdValid)
    return res.status(400).json({ error: { message: "Invalid customer or worker" } });

  const newReview = await Review.create({ customer: customerId, worker: workerId, comment, rating });
  await newReview.save();

  res.status(201).json({ data: { message: "Review added successfully" } });
};
