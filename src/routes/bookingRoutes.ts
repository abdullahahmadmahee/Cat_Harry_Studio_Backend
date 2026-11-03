import express from "express";
import { 
  createBooking, 
  getUserBookings, 
  cancelBooking 
} from "../controllers/bookingController";

const router = express.Router();

router.post("/", createBooking);
router.get("/user/:email", getUserBookings);
router.patch("/:id/cancel", cancelBooking);

export default router;