import { Request, Response } from "express";
import { Studio } from "../models/Studio";

export const createStudio = async (req: Request, res: Response): Promise<void> => {
  try {
    const studio = await Studio.create(req.body);
    res.status(201).json({
      message: "Studio created successfully",
      studio
    });
  } catch (error) {
    console.error("Create Studio Error:", error);
    res.status(500).json({ message: "Failed to create studio." });
  }
};

export const getAllStudios = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;
    let query: any = {};

    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.title = { $regex: search as string, $options: "i" };
    }

    const studios = await Studio.find(query).sort({ createdAt: -1 });
    res.status(200).json(studios);
  } catch (error) {
    console.error("Get All Studios Error:", error);
    res.status(500).json({ message: "Failed to fetch studios." });
  }
};

export const getStudioById = async (req: Request, res: Response): Promise<void> => {
  try {
    const studio = await Studio.findById(req.params.id);
    if (!studio) {
      res.status(404).json({ message: "Studio not found." });
      return;
    }
    res.status(200).json(studio);
  } catch (error) {
    console.error("Get Studio By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch studio details." });
  }
};

export const getStudiosByHost = async (req: Request, res: Response): Promise<void> => {
  try {
    const studios = await Studio.find({ hostEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(studios);
  } catch (error) {
    console.error("Get Studios By Host Error:", error);
    res.status(500).json({ message: "Failed to fetch host studios." });
  }
};