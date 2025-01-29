import { Request, Response } from "express";
import Itinerary from "../model/ItineraryModel/Itinerary";

export const createItinerary = async (req: Request, res: Response) => {
    try {
        const { userId, destination, startDate, endDate, places } = req.body;

        if (!userId || !destination || !startDate || !endDate) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newItinerary = new Itinerary({
            userId,
            destination,
            startDate,
            endDate,
            places,
        });

        await newItinerary.save();
        res.status(201).json({ message: "Itinerary created successfully", itinerary: newItinerary });
    } catch (error) {
        console.error("Itinerary creation error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get itineraries by user ID
export const getItineraries = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const itineraries = await Itinerary.find({ userId });

        if (!itineraries.length) {
            return res.status(404).json({ message: "No itineraries found for this user" });
        }

        res.status(200).json(itineraries);
    } catch (error) {
        console.error("Error fetching itineraries:", error);
        res.status(500).json({ error: "Server error" });
    }
};
