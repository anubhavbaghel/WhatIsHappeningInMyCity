import React from "react";
import MenuButton from "./UI/MenuButton";

const Header = ({ isleftSidebarOpen, setIsLeftSidebarOpen }) => {
  return (
    <div className="flex flex-row bg-white h-15 w-screen items-center gap-5 px-4 py-2 shadow-sm">
      <MenuButton isleftSidebarOpen={isleftSidebarOpen} setIsLeftSidebarOpen={setIsLeftSidebarOpen} />
      <input
        placeholder="Search..."
        className="bg-white border border-gray-300 rounded-lg py-2 px-4 "
      ></input>
      <div>
        <h1 className="text-black text-2xl p-2 rounded-lg ">
          What is happening in my City?
        </h1>
      </div>
    </div>
  );
};

export default Header;
