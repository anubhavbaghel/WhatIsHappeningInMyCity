import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useCurrentLocation from "../hooks/useCurrentLocation.js";
import { useEffect, useState } from "react";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`,
      );
      const data = await res.json();
      setEvents(data._embedded?.events || []);
      // console.log(data._embedded.events[0]._embedded.venues[0].location.latitude);
    };

    fetchEvents();
  }, []);

  const currentLocation = useCurrentLocation();

  const lat = currentLocation?.lat || 51.505; // Default to London if location is not available
  const lng = currentLocation?.lng || -0.09; // Default to London if location is not available
  const position = [lat, lng]; // Use the current location or default to London

  return (
    <>
      {position ? (
        <MapContainer
          center={position}
          zoom={6}
          minZoom={3}
          maxZoom={18}
          scrollWheelZoom={true}
          style={{ height: "100vh", width: "100%" }} // Height is required!
          key={`${lat},${lng}`} // Add a key to force re-render when location changes
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* User Marker */}
          <Marker position={position}>
            <Popup>Hey, Your location</Popup>
          </Marker>

          {/* now we want to run a map function on events and for each event we want to create a marker on the map with the event location and event name in the popup */}
          {events.map((event) => (
            <Marker
              key={event.id}
              position={[
                event._embedded.venues[0].location.latitude,
                event._embedded.venues[0].location.longitude,
              ]}
            >
              <Popup>
                {event.name}
                <br />
                {event.dates.start.localDate}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <MapContainer
          center={[28.6139, 77.209]} // Default to Delhi if location is not available
          zoom={6}
          minZoom={3}
          maxZoom={18}
          scrollWheelZoom={true}
          style={{ height: "100vh", width: "100%" }} // Height is required!
          key={`${lat},${lng}`} // Add a key to force re-render when location changes
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* User Marker */}
          <Marker position={[28.6139, 77.209]}>
            <Popup>Hey, Your location</Popup>
          </Marker>

          {/* now we want to run a map function on events and for each event we want to create a marker on the map with the event location and event name in the popup */}
          {events.map((event) => (
            <Marker
              key={event.id}
              position={[
                event._embedded.venues[0].location.latitude,
                event._embedded.venues[0].location.longitude,
              ]}
            >
              <Popup>
                {event.name}
                <br />
                {event.dates.start.localDate}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
}
