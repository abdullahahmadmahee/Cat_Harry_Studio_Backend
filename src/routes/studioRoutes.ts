import express from "express";
import { 
  createStudio, 
  getAllStudios, 
  getStudioById, 
  getStudiosByHost 
} from "../controllers/studioController";

const router = express.Router();

router.post("/", createStudio);
router.get("/", getAllStudios);
router.get("/:id", getStudioById);
router.get("/host/:email", getStudiosByHost);

export default router;