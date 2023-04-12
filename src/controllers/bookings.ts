import Booking from "@models/Booking";
import Service from "@models/Service";
import { Request, Response } from "express";

export const getBookingsController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };

  const bookings = await Booking.find({ userId: _id }).populate("service");
  res.status(200).json({ data: bookings });
};

export const addBookingController = async (req: Request, res: Response) => {
  const { serviceId } = req.body;

  const serviceExists = await Service.findById(serviceId);
  if (!serviceExists) return res.status(404).json({ error: { message: "Service does not exist" } });

  const { _id: userId } = req.user as { _id: string };
  const booking = await Booking.create({ service: serviceId, userId });

  res.status(201).json({ data: booking });
};
