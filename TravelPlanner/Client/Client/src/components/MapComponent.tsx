import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
  zIndex: -1, // Ensure the map stays in the background
};

const center = {
  lat: 40.7128, // Default to New York, change as needed
  lng: -74.006,
};

interface MapProps {
  setDestination: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapProps> = ({ setDestination }) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      setDestination(lat, lng);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
