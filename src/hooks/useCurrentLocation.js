import React, { useEffect } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = React.useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
    );
  }, []);

  return location;
};

export default useCurrentLocation;
