import express from "express";
import { 
  createBooking, 
  getUserBookings, 
  cancelBooking 
} from "../controllers/bookingController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/user/:email", protect, getUserBookings);
router.patch("/:id/cancel", protect, cancelBooking);

export default router;