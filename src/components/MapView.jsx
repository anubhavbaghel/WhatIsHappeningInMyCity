import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useCurrentLocation from "../hooks/useCurrentLocation.js";
import { useEffect, useState } from "react";
import { marker } from "leaflet";

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

  const lat = currentLocation?.lat; // Default to London if location is not available
  const lng = currentLocation?.lng; // Default to London if location is not available
  const position = [lat, lng]; // Use the current location or default to London

  return (
    <MapContainer
      center={position}
      zoom={1}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }} // Height is required!
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
      {events.map(event => (
        <Marker
         key={event.id}
         position={[event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude]}>
          <Popup>
            {event.name}
            <br />
            {event.dates.start.localDate}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
