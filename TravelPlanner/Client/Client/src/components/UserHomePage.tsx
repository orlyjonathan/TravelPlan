import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
    const [visitedPlaces, setVisitedPlaces] = useState([]);
    const [plannedPlaces, setPlannedPlaces] = useState([]);

    useEffect(() => {
        // Fetch the user's itinerary data, assuming the user has an ID (e.g., "123")
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/itinerary/123`) // User ID example
            .then(response => {
                // Assuming the response contains two separate lists: visited and planned places
                setVisitedPlaces(response.data.visited);
                setPlannedPlaces(response.data.planned);
            })
            .catch(error => console.error("Error fetching itineraries", error));
    }, []);

    return (
        <div>
            <h1>Your Travel Itineraries</h1>
            
            {/* Visited Places Section */}
            <section>
                <h2>Places You've Visited</h2>
                <ul>
                    {visitedPlaces.length > 0 ? (
                        visitedPlaces.map((place, index) => (
                            <li key={index}>
                                <strong>{place.destination}</strong> ({place.startDate} - {place.endDate})
                            </li>
                        ))
                    ) : (
                        <p>No places visited yet.</p>
                    )}
                </ul>
            </section>

            {/* Planned Places Section */}
            <section>
                <h2>Places You Plan to Visit</h2>
                <ul>
                    {plannedPlaces.length > 0 ? (
                        plannedPlaces.map((place, index) => (
                            <li key={index}>
                                <strong>{place.destination}</strong> ({place.startDate} - {place.endDate})
                            </li>
                        ))
                    ) : (
                        <p>No planned places yet.</p>
                    )}
                </ul>
            </section>

            {/* Link to other pages */}
            <Link to="/add-itinerary">Add New Itinerary</Link>
        </div>
    );
};

export default HomePage;

