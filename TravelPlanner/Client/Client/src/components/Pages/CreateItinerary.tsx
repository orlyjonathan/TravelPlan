import { useState } from "react";
import MapComponent from "../../components/MapComponent";
import axios from "axios";

const CreateItinerary = () => {
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [dates, setDates] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async () => {
    if (!destination || !dates.startDate || !dates.endDate) {
      alert("Please fill in all fields");
      return;
    }

    const itinerary = {
      userId: "123", // Replace with actual user ID
      destination: { lat: destination.lat, lng: destination.lng },
      startDate: dates.startDate,
      endDate: dates.endDate,
      places: [],
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/itinerary`, itinerary);
      alert("Itinerary created!");
    } catch (error) {
      console.error("Error creating itinerary", error);
    }
  };

  return (
    <div>
      <MapComponent setDestination={(lat, lng) => setDestination({ lat, lng })} />
      <div style={{ position: "absolute", top: "20px", left: "20px", background: "white", padding: "10px", borderRadius: "5px" }}>
        <h2>Create Itinerary</h2>
        <input
          type="date"
          onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
        />
        <input
          type="date"
          onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
        />
        <button onClick={handleSubmit}>Create Itinerary</button>
      </div>
    </div>
  );
};

export default CreateItinerary;

