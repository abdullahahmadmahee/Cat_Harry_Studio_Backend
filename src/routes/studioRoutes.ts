import express from "express";
import { 
  createStudio, 
  getAllStudios, 
  getStudioById, 
  getStudiosByHost,
  updateStudio,
  deleteStudio
} from "../controllers/studioController";

const router = express.Router();

router.post("/", createStudio);
router.get("/", getAllStudios);
router.get("/:id", getStudioById);
router.get("/host/:email", getStudiosByHost);
router.put("/:id", updateStudio);
router.delete("/:id", deleteStudio);

export default router;