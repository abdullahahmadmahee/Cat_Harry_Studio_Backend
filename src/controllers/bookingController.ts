import { Request, Response } from "express";
import { Booking } from "../models/Booking";
import { Studio } from "../models/Studio";

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studioId, userEmail, date, startTime, endTime, totalPrice } = req.body;

    const studio = await Studio.findById(studioId);
    if (!studio) {
      res.status(404).json({ message: "Studio not found." });
      return;
    }

    const existingBookings = await Booking.find({ 
      studioId, 
      date,
      status: { $ne: "Cancelled" } 
    });

    const hasConflict = existingBookings.some(booking => {
      return (startTime < booking.endTime && endTime > booking.startTime);
    });

    if (hasConflict) {
      res.status(400).json({ message: "This workspace is already booked for the selected time slot." });
      return;
    }

    const newBooking = await Booking.create({
      studioId,
      userEmail,
      date,
      startTime,
      endTime,
      totalPrice,
      status: "Pending"
    });

    res.status(201).json({
      message: "Booking reservation successful.",
      booking: newBooking
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    res.status(500).json({ message: "Failed to create booking." });
  }
};