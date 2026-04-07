import React, { useEffect } from "react";

const useCurrentLocation = () => {
    const [location, setLocation] = React.useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }

    }, []);
    return <div>useCurrentLocation</div>;
};

export default useCurrentLocation;
