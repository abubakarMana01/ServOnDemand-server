import Service, { validateAddService } from "@models/Service";
import { Request, Response } from "express";

export const getAllServicesController = async (req: Request, res: Response) => {
  const services = await Service.find();
  return res.status(200).json(services);
};

export const addServiceController = async (req: Request, res: Response) => {
  const { title, picture } = req.body;

  const { error } = validateAddService(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const serviceExists = await Service.findOne({ title: title.toLowerCase() });
  if (serviceExists) return res.status(400).json({ error: { message: "Service already exists" } });

  const service = await Service.create({ title, picture });
  const saved = await service.save();

  return res.status(201).json({ data: saved });
};

export const addMultipleServices = async (req: Request, res: Response) => {
  const services = req.body;

  const savedServices = await Service.insertMany(services);

  return res.status(201).json({ data: savedServices });
};
