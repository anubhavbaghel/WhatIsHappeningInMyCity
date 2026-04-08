const getAndSetCurrentLocation = ({ currentLocation, setCurrentLocation, setLoading }) => { 
  setLoading(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLoading(false);
    },
    (error) => {
      console.error("Error getting location:", error);
      setLoading(false);
    },
  );

  console.log("Current Location set in hook:", currentLocation);
  return currentLocation;
};

export default getAndSetCurrentLocation;
