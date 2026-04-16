import MapView from "./components/MapView.jsx";
import "leaflet/dist/leaflet.css";
import SideBar from "./components/SideBar.jsx";
import { useState } from "react";
import EventInformation from "./components/EventInformation.jsx";
import Header from "./components/Header/Header.jsx";
import CitySelection from "./components/CitySelection.jsx";
import InfoBar from "./components/InfoBar.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isleftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [currentCity, setCurrentCity] = useState("");

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header
        isleftSidebarOpen={isleftSidebarOpen}
        setIsLeftSidebarOpen={setIsLeftSidebarOpen}
      ></Header>
      <div className="flex flex-col md:flex-row h-full w-full p-1.5 gap-1.5">
        <SideBar isleftSidebarOpen={isleftSidebarOpen}></SideBar>
        <MapView
          events={events}
          setEvents={setEvents}
          isEventSelected={isEventSelected}
          setIsEventSelected={setIsEventSelected}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        ></MapView>
        <InfoBar
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          isEventSelected={isEventSelected}
          setIsEventSelected={setIsEventSelected}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </div>
    </div>
  );
}

export default App;
