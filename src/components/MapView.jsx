import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import getCurrentLocation from "../hooks/getAndSetCurrentLocation.js";
import { useEffect, useState } from "react";
import L from "leaflet";
import getNearbyEvents from "../hooks/getNearbyEvents.js";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import LocationButton from "./UI/LocationButton.jsx";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  const [events, setEvents] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchNearbyEvents = async () => {

      if (!currentLocation) return; // If currentLocation is not set, do nothing
      const data = await getNearbyEvents(currentLocation.lat, currentLocation.lng);
      setEvents(data.results || []);

      console.log("Data from getNearbyEvents:", data);
      console.log("Data from getNearbyEvents:", data.results);
      // console.log(data._embedded.events[0]._embedded.venues[0].location.latitude);
    };

    fetchNearbyEvents();
  }, [currentLocation]);

  const lat = currentLocation?.lat; 
  const lng = currentLocation?.lng; 
  const position = [lat, lng];

  return (
    <div className="relative h-screen w-screen">
      <MapContainer
        center={currentLocation ? position : [51.505, -0.09]}
        zoom={10}
        minZoom={3}
        maxZoom={18}
        scrollWheelZoom={true}
        className="h-full w-full"
        key={`${lat},${lng}`} // Add a key to force re-render when location changes
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {/* User Marker when location*/}
        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]}>
            <Popup>Hey, Your location</Popup>
          </Marker>
        )}

        {/* now we want to run a map function on events and for each event we want to create a marker on the map with the event location and event name in the popup */}
        {events.map((event) => (
          <Marker
            key={event.place_id}
            position={[
              event.geometry.location.lat,
              event.geometry.location.lng,
            ]}
          >
            <Popup>
              {event.name}
              {event.vicinity}
              
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <LocationButton
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      ></LocationButton>
    </div>
  );
}
