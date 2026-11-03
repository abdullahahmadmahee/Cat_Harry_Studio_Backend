import express from "express";
import { 
  createStudio, 
  getAllStudios, 
  getStudioById, 
  getStudiosByHost,
  updateStudio,
  deleteStudio
} from "../controllers/studioController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createStudio);
router.get("/", getAllStudios); // Public
router.get("/:id", getStudioById); // Public
router.get("/host/:email", protect, getStudiosByHost);
router.put("/:id", protect, updateStudio);
router.delete("/:id", protect, deleteStudio);

export default router;