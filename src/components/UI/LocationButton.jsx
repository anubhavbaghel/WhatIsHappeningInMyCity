import React from "react";
import getAndSetCurrentLocation from "../../hooks/getAndSetCurrentLocation.js";
import locationDisabledIcon from "../../assets/icons/location_disabled.svg";
import locationEnabledIcon from "../../assets/icons/location_enabled.svg";
import { useState } from "react";
import getNearbyEvents from "../../hooks/getNearbyEvents.js";
const LocationButton = ({ currentLocation, setCurrentLocation }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    console.log(
      "Location Button Clicked. Current currentLocation:",
      currentLocation,
    );
    if (currentLocation) return; // If currentLocation is already set, do nothing

    if (!currentLocation) {
      await getAndSetCurrentLocation({
        currentLocation,
        setCurrentLocation,
        setLoading,
      });
    }
  };

  return (
    <>
      <button
        className={`absolute p-3 bg-white border border-gray-300 rounded-full z-9999 top-3 right-3 sm:top-5 sm:right-5 `}
        onClick={handleClick}
        disabled={!!currentLocation || loading}
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        ) : !currentLocation ? (
          <img type="svg" src={locationDisabledIcon} alt="Location" />
        ) : (
          <img type="svg" src={locationEnabledIcon} alt="Location" />
        )}
      </button>
    </>
  );
};

export default LocationButton;
