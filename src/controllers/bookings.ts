import Booking, { validateAddBooking } from "@models/Booking";
import Service from "@models/Service";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const getBookingsController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };

  const bookings = await Booking.find({ userId: _id }).populate("service");
  res.status(200).json({ data: bookings });
};

export const getUpcomingBookingsController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };

  const bookings = await Booking.find({ userId: _id, status: "upcoming" }).populate("service");
  res.status(200).json({ data: bookings });
};

export const addBookingController = async (req: Request, res: Response) => {
  const { serviceId, status } = req.body;

  const { error } = validateAddBooking(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const isValidObjectId = mongoose.Types.ObjectId.isValid(serviceId);
  if (!isValidObjectId) return res.status(400).json({ error: { message: "Service does not exist" } });

  const serviceExists = await Service.findById(serviceId);
  if (!serviceExists) return res.status(404).json({ error: { message: "Service does not exist" } });

  const { _id: userId } = req.user as { _id: string };
  const booking = await Booking.create({ service: serviceId, userId, status });

  res.status(201).json({ data: booking });
};
