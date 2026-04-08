import MapView from "./components/MapView.jsx";
import "leaflet/dist/leaflet.css";
import SideBar from "./components/SideBar.jsx";
import { useState } from "react";
import InformationBar from "./components/InformationBar.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isleftSidebarOpen, setIsLeftSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header isleftSidebarOpen={isleftSidebarOpen} setIsLeftSidebarOpen={setIsLeftSidebarOpen}></Header>
      <div className="flex flex-row h-full w-full p-1.5 gap-1.5">
        <SideBar isleftSidebarOpen={isleftSidebarOpen}></SideBar>
        <MapView events={events} setEvents={setEvents} isEventSelected={isEventSelected} setIsEventSelected={setIsEventSelected} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}></MapView>
        <InformationBar events={events} isEventSelected={isEventSelected} setIsEventSelected={setIsEventSelected} selectedEvent={selectedEvent}></InformationBar>
      </div>
    </div>
  );
}

export default App;
