import MenuItems from "./MenuItems";
import CloseIconURI from "../assets/icons/close.svg";

const SideBar = () => {
  return (
    <div className="rounded-lg left-sidebar m-2 min-w-[25%]">
      <div>
        <h1 className="text-black text-2xl  p-2 rounded-lg">
          What is happening in my City?
        </h1>
      </div>
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
