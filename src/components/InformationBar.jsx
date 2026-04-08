const InformationBar = ({ isEventSelected, selectedEvent }) => {
  if (!isEventSelected) return null;

  return (
    <div className="flex h-full w-1/3 bg-white p-4 overflow-y-auto border border-black rounded-lg">
      <h1 className="text-2xl">{selectedEvent?.name}</h1>
    </div>
  );
};

export default InformationBar;
