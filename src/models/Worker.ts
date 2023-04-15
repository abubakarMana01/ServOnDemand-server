import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 255,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 255,
      lowercase: true,
    },
    serviceOffered: {
      type: {
        description: {
          type: String,
          required: true,
          trim: true,
        },
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
      },
      required: true,
    },
    chargePerHour: {
      type: Number,
      required: true,
    },
    location: {
      type: {
        coordinates: {
          longitude: {
            type: String,
            required: true,
          },
          latitude: {
            type: String,
            required: true,
          },
        },
        address: {
          type: String,
          required: true,
          trime: true,
          maxlength: 1000,
        },
      },
      required: true,
    },
  },
  { timestamps: true },
);

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;
