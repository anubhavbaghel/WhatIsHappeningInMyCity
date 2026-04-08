import menuButton from "../../assets/icons/menu.svg";

const MenuButton = ({ isleftSidebarOpen, setIsLeftSidebarOpen }) => {
  const handleMenuClick = () => {
    setIsLeftSidebarOpen(!isleftSidebarOpen);
    console.log("Menu button clicked. Left sidebar open:", !isleftSidebarOpen);
  };

  return (
      <button
        className="p-1 bg-white border border-gray-300 rounded-full"
        onClick={handleMenuClick}
      >
        <img type="svg" src={menuButton} alt="Menu" />
      </button>
  );
};

export default MenuButton;
