const EventInformation = ({ isEventSelected, selectedEvent }) => {
  if (!isEventSelected) return (
    <div className="flex flex-col h-full w-full md:w-1/3 bg-white p-4 overflow-y-auto border border-black rounded-lg items-center justify-center">
      <h1 className="text-2xl">Select an event to see details</h1>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-white p-4 overflow-y-auto border border-black rounded-lg">
      <h1 className="text-2xl">{selectedEvent?.title}</h1>
      <h2>
        {selectedEvent?.tags?.length > 0 ? (
          selectedEvent.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-800 text-sm font-semibold px-2 py-1 rounded-full mr-2"
            >
              {tag.toUpperCase()}
            </span>
          ))) : ("")}
      </h2>
      <p className="mt-2">{selectedEvent?.description}</p>
      <div>
        Highlights:{" "}
        {selectedEvent?.highlights?.length > 0 ? (
          <ul className="list-disc pl-5">
            {selectedEvent.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        ) : (
          "N/A"
        )}
      </div>
      <p className="mt-2">Location: {selectedEvent?.location?.name}</p>
      <p className="mt-2">
        Date:{" "}
        {selectedEvent?.date
          ? new Date(selectedEvent.date).toLocaleString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "N/A"}
      </p>
      <p className="mt-2">
        Time:{" "}
        {selectedEvent?.date
          ? new Date(selectedEvent.date).toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A"}{" "}
        {" - "}
        {selectedEvent?.date
          ? new Date(selectedEvent.endDate).toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A"}
      </p>
      <p>
        Price:{" "}
        {selectedEvent?.price
          ? selectedEvent.price.amount === 0
            ? "Free"
            : `₹${selectedEvent.price.amount.toFixed(2)}`
          : "N/A"}
      </p>
      <p>
        Suitable for:{" "}
        {selectedEvent?.audience.toUpperCase() || "N/A"}
      </p>
      <a
        href={selectedEvent?.links.tickets}
        className="flex p-2 border border-black rounded-full items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        Book Ticket
      </a>
    </div>
  );
};

export default EventInformation;
