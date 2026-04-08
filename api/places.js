export default async function handler(req, res) {
  const { lat, lng } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=${apiKey}`,
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching places:", error);
    return res.status(500).json({ error: "Failed to fetch places" });
  }
}
