import { Router } from "express";
import { getItineraryByUserId, addItinerary } from "../controllers/itineraryController";

const router = Router();

// Route to get itinerary by userId
router.get("/:userId", getItineraryByUserId);

// Route to add or update an itinerary
router.post("/", addItinerary);

export default router;
