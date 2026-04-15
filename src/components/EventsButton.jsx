const MenuItems = ({title}) => {
  return (
    <div className="my-1 px-2 rounded-md text-md text-center text-black hover:bg-gray-200  flex items-center border border-black-100 justify-center">
      {title}
    </div>
  );
};

export default MenuItems;
