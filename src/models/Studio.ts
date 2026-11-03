import mongoose from "mongoose";

const studioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  securityDeposit: { type: Number, default: 0 },
  capacity: { type: Number, default: 1 },
  location: { type: String, required: true },
  image: { type: String, required: true },
  amenities: { type: [String], default: [] },
  overview: { type: String, default: "" },
  hostName: { type: String, required: true },
  hostEmail: { type: String, required: true }
}, { 
  timestamps: true 
});

export const Studio = mongoose.model("Studio", studioSchema);