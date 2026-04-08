import MapView from "./components/MapView.jsx";
import "leaflet/dist/leaflet.css";
import SideBar from "./components/SideBar.jsx";
import { useState } from "react"; 

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className={"flex flex-row"}>
        {(loading) && (
          <div className="absolute top-0 w-full h-full flex items-center justify-center bg-white z-50">
            <div className="text-black text-2xl">Loading...</div>
          </div>
        )}
        <SideBar></SideBar>
        <MapView loading={loading} setLoading={setLoading}></MapView>
      </div>
    </>
  );
}

export default App;
