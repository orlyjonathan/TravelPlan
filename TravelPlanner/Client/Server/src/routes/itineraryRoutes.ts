import express from "express";
import { createItinerary, getItineraries } from "../controllers/itineraryController";
const router = express.Router();

router.post("/", createItinerary);
router.get("/:userId", getItineraries);

export default router;
