import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  status: {
    type: String,
    default: "Ongoing",
    enum: ["Ongoing", "Completed"],
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
