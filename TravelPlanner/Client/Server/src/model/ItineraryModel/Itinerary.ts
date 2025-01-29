import mongoose, { Schema, Document } from "mongoose";

interface IItinerary extends Document {
    userId: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    places: string[];
}

const ItinerarySchema = new Schema<IItinerary>({
    userId: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    places: { type: [String], required: true },
});

export default mongoose.model<IItinerary>("Itinerary", ItinerarySchema);
