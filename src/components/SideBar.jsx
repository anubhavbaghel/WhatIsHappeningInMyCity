import MenuItems from "./MenuItems";
import CloseIconURI from "../assets/icons/close.svg";

const SideBar = ({ isleftSidebarOpen }) => {
  return (
    <div className={`px-2 left-sidebar h-full w-1/3 ${isleftSidebarOpen ? "flex" : "hidden"} flex-col border border-black rounded-lg `}>
      
      <MenuItems title="Markets & Shopping" />
      <MenuItems title="Music & Nightlife" />
      <MenuItems title="Arts & Culture" />
      <MenuItems title="Food & Drinks" />
      <MenuItems title="Sports & Fitness" />
      <MenuItems title="Family & Kids" />
      <MenuItems title="Learning & Networking" />
      <MenuItems title="Festivals & Spiritual" />
      <MenuItems title="Outdoor & Nature" />
      <MenuItems title="Entertainment & Gaming" />
      <MenuItems title="Government & Community" />
      <MenuItems title="Wellness" />
    </div>
  );
};

export default SideBar;
