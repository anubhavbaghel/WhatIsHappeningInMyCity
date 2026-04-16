import { Events } from "leaflet";

const EventsButton = ({title}) => {

  const handleClick = () => {
    //1. When button is clicked get the title of the button
    const buttonTitle = title;
    //2. Use the title to search for those particular events in the API and get the data
    
    //3. Set the events in the state and then show the events in the map view
  }
  return (
    <button 
      className="my-1 px-2 rounded-md text-md text-center text-black hover:bg-gray-200  flex items-center border border-black-100 justify-center "
      onClick={handleClick}>
      {title}
    </button>
  );
};

export default EventsButton;
