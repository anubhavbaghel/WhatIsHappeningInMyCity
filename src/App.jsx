import MapView from "./components/MapView.jsx";
import "leaflet/dist/leaflet.css";
import SideBar from "./components/SideBar.jsx";

function App() {

  return (
    <>
      <div className={"flex flex-row"}>
        <SideBar ></SideBar>
        <MapView ></MapView>
      </div>
    </>
  );
}

export default App;
