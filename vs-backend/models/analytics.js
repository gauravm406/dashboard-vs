import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  day: {
    type: Date,
    required: true,
  },
  age: {
    type: String,
    enum: ["15-25", ">25"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  features: {
    type: Map,
    of: Number,
  },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
