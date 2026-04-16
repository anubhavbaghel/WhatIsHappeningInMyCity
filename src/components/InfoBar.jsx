import React from 'react'
import CitySelection from './CitySelection'
import EventInformation from './EventInformation'

const InfoBar = ({isCitySelected, isEventSelected, currentCity, setCurrentCity, selectedEvent, setSelectedEvent}) => {
  return (
    <div className="flex flex-col h-full w-full md:w-1/3 bg-white p-4 overflow-y-auto border border-black rounded-lg">
        {/* User comming for first time, event not selected ask user which city event they want to see */}
        {!isCitySelected && <CitySelection currentCity={currentCity} setCurrentCity={setCurrentCity} />}

        {/* User has selected a city but not an event, show the events in that city */}
        {(isCitySelected && !isEventSelected) && <div>You are seeing events in {currentCity}</div>}
        
        {/* User has selected an event, show the event details */}
        {isEventSelected && <EventInformation isEventSelected={isEventSelected} selectedEvent={selectedEvent} />}
    </div>
  )
}

export default InfoBar