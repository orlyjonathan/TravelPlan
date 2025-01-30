import { Schema, model, Document } from "mongoose";

// Itinerary Schema
const itinerarySchema = new Schema(
  {
    userId: { type: String, required: true },
    visited: [
      {
        destination: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
      },
    ],
    planned: [
      {
        destination: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Itinerary Model
interface IItinerary extends Document {
  userId: string;
  visited: Array<{ destination: string; startDate: string; endDate: string }>;
  planned: Array<{ destination: string; startDate: string; endDate: string }>;
}

const Itinerary = model<IItinerary>("Itinerary", itinerarySchema);

export default Itinerary;

