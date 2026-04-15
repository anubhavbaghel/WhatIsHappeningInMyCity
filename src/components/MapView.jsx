import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

  // useEffect(() => {
  //   const fetchNearbyEvents = async () => {
  //     if (!currentLocation) return; // If currentLocation is not set, do nothing
  //     const data = await getNearbyEvents(
  //       currentLocation.lat,
  //       currentLocation.lng,
  //     );
  //     setEvents(data.results || []);

  //     console.log("Data from getNearbyEvents:", data);
  //     console.log("Data from getNearbyEvents:", data.results);
  //     // console.log(data._embedded.events[0]._embedded.venues[0].location.latitude);
  //   };

  //   fetchNearbyEvents();
  // }, [currentLocation]);

  const handleMarkerClick = (event) => {
    console.log("handleMarkerClick:", event);

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

  function MapController({ selectedEvent, currentLocation, events, delhiEvents }) {
    /**
     * MapController
     * - Runs inside the MapContainer so `useMap()` returns the Leaflet map instance.
     * - Watches `selectedEvent` and `currentLocation` and recenters/zooms the map accordingly.
     *
     * Behavior:
     * 1. If `selectedEvent` is provided, resolve its coordinates and fly to it (zoom level 14).
     * 2. Otherwise, if `currentLocation` exists, fly to the user's location (zoom level 13).
     * 3. If neither is available, fly to the default Delhi view (zoom level 3).
     *
     * The `resolveEvent` helper attempts to handle different shapes for `selectedEvent`:
     * - an object containing a `location` with `lat`/`lng`
     * - an object with top-level `lat`/`lng`
     * - an ID (string/number) that can be matched against known event lists
     */
    const map = useMap();

    useEffect(() => {
      if (!map) return; // map not ready yet

      // Try to normalize/resolve the passed `selectedEvent` into a full event object
      // const resolveEvent = (sel) => {
      //   if (!sel) return null;
      //   // already has a location
      //   if (sel.location && (sel.location.lat || sel.location.lng)) return sel;
      //   // try matching by id against known lists
      //   const id = sel.id ?? sel;
      //   let found = delhiEvents.find((e) => String(e.id) === String(id));
      //   if (!found && events && events.length) found = events.find((e) => String(e.id) === String(id));
      //   return found || sel;
      // };

      // const evt = resolveEvent(selectedEvent);

      // If we have a selected event with coordinates, fly there with a closer zoom
      if (selectedEvent) {
        const sLat = selectedEvent.location?.lat ?? selectedEvent.lat;
        const sLng = selectedEvent.location?.lng ?? selectedEvent.lng;
        if (sLat && sLng) map.flyTo([sLat, sLng], 11, { duration: 1.0 });
        return;
      }

      // If no selected event, but we know the user's current location, fly there
      if (currentLocation) {
        map.flyTo([currentLocation.lat, currentLocation.lng], 11, { duration: 1.0 });
        return;
      }

      // Fallback: show default city view
      map.flyTo([28.6139, 77.209], 11, { duration: 1.0 });
    }, [selectedEvent, currentLocation, events, delhiEvents, map]);

    return null;
  }

  const lat = currentLocation?.lat;
  const lng = currentLocation?.lng;
  const position = [lat, lng];

  return (
    <div className="relative h-full w-full overflow-hidden border border-black rounded-lg">
      <MapContainer
        center={[28.6139, 77.209]} // Default to Delhi if location is not available
        zoom={11}
        minZoom={3}
        maxZoom={18}
        scrollWheelZoom={true}
        className="h-full w-full"
        // removed key to avoid remounting the map instance on location changes
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController selectedEvent={selectedEvent} currentLocation={currentLocation} events={events} delhiEvents={delhiEvents} />
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
