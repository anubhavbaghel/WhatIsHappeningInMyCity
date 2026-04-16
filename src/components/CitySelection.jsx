import React from "react";

const CitySelection = ({ currentCity, setCurrentCity }) => {
  return (
    <div className="flex items-center gap-2 border border-black rounded-full p-2">  
      <select
        value={currentCity}
        onChange={(e) => setCurrentCity(e.target.value)}
        className="border border-black rounded-full p-1"
      >
        <option value="select-city">Select City</option>
        <option value="delhi">Delhi</option>
        <option value="mumbai">Mumbai</option>
        <option value="bangalore">Bangalore</option>
        <option value="hyderabad">Hyderabad</option>
        <option value="Pune">Pune</option>
      </select>
    </div>
  );
};

export default CitySelection;
