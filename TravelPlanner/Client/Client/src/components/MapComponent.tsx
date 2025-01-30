import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const center = {
  lat: 40.7128, // Default to New York, change as needed
  lng: -74.0060,
};

interface MapProps {
  setDestination: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapProps> = ({ setDestination }) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

  // This function listens for map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;
        setMarker({ lat, lng });
        setDestination(lat, lng);
      }
    });
  };

  return (
    <MapContainer center={center} zoom={5} style={{ height: "100vh", width: "100%" }}>
      {/* Use Mapbox Satellite TileLayer */}
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN"
        attribution="Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>"
      />
      <MapClickHandler />
      {marker && <Marker position={marker}><Popup>Marker at {marker.lat}, {marker.lng}</Popup></Marker>}
    </MapContainer>
  );
};

export default MapComponent;
