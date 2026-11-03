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
      status: "Confirmed"
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

export const getUserBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email })
      .populate("studioId", "title location image category")
      .sort({ createdAt: -1 });
      
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get User Bookings Error:", error);
    res.status(500).json({ message: "Failed to fetch user bookings." });
  }
};

export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true, runValidators: true }
    );

    if (!booking) {
      res.status(404).json({ message: "Booking not found." });
      return;
    }

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    res.status(500).json({ message: "Failed to cancel booking." });
  }
};