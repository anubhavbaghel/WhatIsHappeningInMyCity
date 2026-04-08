const getAndSetCurrentLocation = ({ currentLocation, setCurrentLocation }) => { 

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      console.error("Error getting location:", error);
    },
  );

  console.log("Current Location set in hook:", currentLocation);
  return currentLocation;
};

export default getAndSetCurrentLocation;
