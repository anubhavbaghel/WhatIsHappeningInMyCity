const getNearbyEvents = async (lat, lng) => {
  const API_BASE = import.meta.env.VITE_API_BASE ?? "";

  const response = await fetch(
    `${API_BASE}/api/places?lat=${lat}&lng=${lng}`,
  );
  const data = await response.json();
  console.log(data);

  return data;
};

export default getNearbyEvents;
