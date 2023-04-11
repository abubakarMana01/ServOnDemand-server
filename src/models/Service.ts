import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  picture: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
