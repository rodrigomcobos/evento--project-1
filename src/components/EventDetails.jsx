import React, { useState, useEffect } from 'react';
import { FaStar, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const EventDetails = ({ event, openModal }) => {
    const [eventCoordinates, setEventCoordinates] = useState([40.7608, -111.8910]);
    const [mapKey, setMapKey] = useState(0);

    useEffect(() => {
        if (event._embedded && event._embedded.venues && event._embedded.venues[0]) {
            const venue = event._embedded.venues[0];
            if (venue.location) {
                const newCoordinates = [parseFloat(venue.location.latitude), parseFloat(venue.location.longitude)];
                setEventCoordinates(newCoordinates);
                setMapKey(prevKey => prevKey + 1);
            }
        }
    }, [event]);

    const getEventDescription = () => {
        if (event.info) {
            return event.info;
        } else if (event._embedded && event._embedded.attractions && event._embedded.attractions[0] && event._embedded.attractions[0].description) {
            return event._embedded.attractions[0].description;
        } else {
            return 'No details available for this event.';
        }
    };

    return (
        <div className="flex flex-col mt-14 mb-32">
            <div className="flex flex-col max-w-7xl mx-auto md:flex-row p-6 md:px-20 md:py-10">
                {/* Left Column */}
                <section className="md:w-2/3 w-full md:pr-8 mb-10 md:mb-0">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-4">{event.name}</h1>

                    {/* Event Image */}
                    <div className="w-full h-[32rem] bg-gray-200 rounded-lg mb-6 overflow-hidden">
                        <img
                            src={event.images[0].url}
                            alt={event.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Details</h2>
                        <p className="text-gray-600 text-md leading-relaxed">{getEventDescription()}</p>
                    </div>
                </section>

                {/* Right Column */}
                <section className="md:w-1/3 w-full bg-slate-50 p-6 rounded-lg shadow-inner shadow-gray-400 space-y-4">
                    {/* Event Date & Time */}
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-indigo-600" />
                            <span className="ml-2 text-md font-semibold">
                                {new Date(event.dates.start.dateTime).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FaClock className="text-indigo-600" />
                            <span className="ml-2 text-md font-semibold">
                                {new Date(event.dates.start.dateTime).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-indigo-600" />
                            <span className="ml-2 text-md font-semibold">
                                {event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}
                            </span>
                        </div>
                    </div>

                    {/* Mini Map */}
                    <div className="mb-4">
                        <MapContainer
                            key={mapKey}
                            center={eventCoordinates}
                            zoom={13}
                            style={{ height: '200px', width: '100%', zIndex: 0 }}
                        >
                            <ChangeView center={eventCoordinates} zoom={13} />
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={eventCoordinates}>
                                <Popup>{event._embedded.venues[0].name}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                    {/* Get Tickets Button */}
                    <button
                        onClick={openModal}
                        className="min-w-min px-8 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Get Tickets
                    </button>
                </section>
            </div>
        </div>
    );
};

export default EventDetails;