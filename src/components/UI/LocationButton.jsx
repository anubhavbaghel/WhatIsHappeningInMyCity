import React from "react";
import getAndSetCurrentLocation from "../../hooks/getAndSetCurrentLocation.js";
import locationDisabledIcon from "../../assets/icons/location_disabled.svg";
import locationEnabledIcon from "../../assets/icons/location_enabled.svg";  

const LocationButton = ({ currentLocation, setCurrentLocation }) => {


  const handleClick = async () => {
    console.log("Location Button Clicked. Current currentLocation:", currentLocation);
    if (currentLocation) return; // If currentLocation is already set, do nothing

    await getAndSetCurrentLocation({ currentLocation: currentLocation, setCurrentLocation: setCurrentLocation });
  };

  return (
    <button
      className="absolute p-3 bg-white border border-gray-300 rounded-full bottom-2 right-2 z-9999"
      onClick={handleClick}
      disabled={!!currentLocation}
    >
      {(!currentLocation) ? (<img type="svg" src={locationDisabledIcon} alt="Location" />) :(<img type="svg" src={locationEnabledIcon} alt="Location" />)}
    </button>
  );
};

export default LocationButton;
