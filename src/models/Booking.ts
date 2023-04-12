import Joi from "joi";
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  service: {
    ref: "Service",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export const validateBooking = (data: unknown) => {
  const schema = Joi.object({
    serviceId: Joi.string().required().label("User ID"),
  });

  return schema.validate(data);
};

export default Booking;
