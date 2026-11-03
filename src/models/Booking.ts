import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  studioId: { type: mongoose.Schema.Types.ObjectId, ref: "Studio", required: true },
  userEmail: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"], 
    default: "Pending" 
  }
}, { 
  timestamps: true 
});

export const Booking = mongoose.model("Booking", bookingSchema);