import Joi from "joi";
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  service: {
    ref: "Service",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "cancelled", "upcoming"],
    default: "upcoming",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export const validateAddBooking = (data: unknown) => {
  const schema = Joi.object({
    serviceId: Joi.string().required().label("User ID"),
    status: Joi.string().label("Status"),
  });

  return schema.validate(data);
};

export default Booking;
