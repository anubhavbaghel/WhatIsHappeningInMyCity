import React from "react";
import MenuButton from "../Buttons/MenuButton";

const Header = ({ isleftSidebarOpen, setIsLeftSidebarOpen }) => {
  return (
    <div className="flex flex-row bg-white h-15 w-screen items-center justify-center px-4 py-2 shadow-sm">
        <h1 className="text-2xl font-semibold">
          What is happening in my City?
        </h1>
    </div>
  );
};

export default Header;
