import { useEffect, useState } from "react";
import axios from "axios";
import { Itinerary } from "../../model/itineraryModel";

const HomePage = () => {
    const [itineraries, setItineraries] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/itinerary/123`) // User ID example
            .then(response => setItineraries(response.data))
            .catch(error => console.error("Error fetching itineraries", error));
    }, []);

    return (
        <div>
            <h1>Your Travel Itineraries</h1>
            <ul>
                {itineraries.map((itinerary, index) => (
                    <li key={index}>{itinerary.destination} ({itinerary.startDate} - {itinerary.endDate})</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
