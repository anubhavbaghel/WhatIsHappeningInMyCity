import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import getCurrentLocation from "../hooks/getAndSetCurrentLocation.js";
import { useEffect, useState } from "react";
import L from "leaflet";
import getNearbyEvents from "../hooks/getNearbyEvents.js";
import delhi_events from "../data/delhi_events.json";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import LocationButton from "./Buttons/LocationButton.jsx";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView({
  events,
  setEvents,
  isEventSelected,
  setIsEventSelected,
  selectedEvent,
  setSelectedEvent,
}) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const delhiEvents = delhi_events.events;

  useEffect(() => {
    const fetchNearbyEvents = async () => {
      if (!currentLocation) return; // If currentLocation is not set, do nothing
      const data = await getNearbyEvents(
        currentLocation.lat,
        currentLocation.lng,
      );
      setEvents(data.results || []);

      console.log("Data from getNearbyEvents:", data);
      console.log("Data from getNearbyEvents:", data.results);
      // console.log(data._embedded.events[0]._embedded.venues[0].location.latitude);
    };

    fetchNearbyEvents();
  }, [currentLocation]);

  const handleMarkerClick = (event) => {

    if (isEventSelected && selectedEvent?.id === event.id) {
      setIsEventSelected(false);
      setSelectedEvent(null);
    }
    // If when the marker is clicked, the event is already selected and we want to click on another event
    if (isEventSelected) {
      setSelectedEvent(event);
      return;
    }
    //When a marker is clicked, we want to set the selected event in the state and also set isEventSelected to true so that we can show the event details in the information bar
    if (!isEventSelected) {
      setIsEventSelected(true);
      setSelectedEvent(event);
      console.log("Selected Event:", event);
      return;
    }

  };

  const lat = currentLocation?.lat;
  const lng = currentLocation?.lng;
  const position = [lat, lng];

  return (
    <div className="relative h-full w-full overflow-hidden border border-black rounded-lg">
      <MapContainer
        center={currentLocation ? position : [28.5500, 77.2025]}
        zoom={11}
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
        {delhiEvents.map((event) => (
          <Marker
            key={event.id}
            position={[
              event.location.lat,
              event.location.lng,
            ]}
            eventHandlers={{
              click: () => handleMarkerClick(event),
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup(),
            }}
          >
            <Popup>
              <div style={{ minWidth: "180px" }}>
                <h3 style={{ margin: 0 }}>{event.title}</h3>
              </div>
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
