import { Request, Response } from "express";
import Itinerary from "../model/ItineraryModel/Itinerary";


// Fetch itineraries by userId
export const getItineraryByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    // Fetch itinerary by userId
    const itinerary = await Itinerary.findOne({ userId });

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add or update a user's itinerary
export const addItinerary = async (req: Request, res: Response) => {
  const { userId, visited, planned } = req.body;

  try {
    // Check if itinerary exists for the user
    let itinerary = await Itinerary.findOne({ userId });

    if (!itinerary) {
      // Create a new itinerary if it doesn't exist
      itinerary = new Itinerary({
        userId,
        visited,
        planned,
      });
      await itinerary.save();
      return res.status(201).json({ message: "Itinerary created" });
    }

    // Update the existing itinerary
    itinerary.visited = visited;
    itinerary.planned = planned;
    await itinerary.save();

    res.status(200).json({ message: "Itinerary updated" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
