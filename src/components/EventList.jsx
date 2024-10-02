import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// react-icons
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { BsEmojiDizzy } from "react-icons/bs";
import { ImSpinner2 } from 'react-icons/im';

const EventList = ({ currentEvent }) => {
    const [relatedEvents, setRelatedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch related events based on the current event's name
        const fetchRelatedEvents = async () => {
            try {
                // Get events from the API with the same name as the current event
                const response = await axios.get(`http://localhost:5001/api/ticketmaster/events`, {
                    params: {
                        keyword: currentEvent.name,
                        size: 20 // Limit to 10 events, adjust as needed
                    }
                });
                // Filter out the current event and limit to a maximum of 4 related events
                const filteredEvents = response.data._embedded.events
                    .filter(event => event.id !== currentEvent.id)
                    .slice(0, 12);
                // Set the related events state
                setRelatedEvents(filteredEvents);
                // Loading is done
                setLoading(false);
            } catch (err) {
                console.error("Error fetching related events:", err);
                // Set an error message
                setError('Failed to fetch related events');
                // Loading is done
                setLoading(false);
            }
        };

        // Only fetch related events if the current event has a name
        if (currentEvent && currentEvent.name) {
            fetchRelatedEvents();
        }
    }, [currentEvent]);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <ImSpinner2 className="animate-spin text-black text-4xl" />
        </div>
    );
    if (error) return <div className="flex items-center flex-col justify-center min-h-96">
        <BsEmojiDizzy className="text-red-500 animate-bounce text-6xl mb-5" />
        <p className="font-bold text-red-500 ml-5 text-center mb-1">Ops! Failed to Load Events.</p>
        <p className="font-bold text-red-500 ml-5 text-center">Please refresh page.</p>
    </div>;
    if (relatedEvents.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto p-6 md:px-20 md:py-10 mb-14">
            <h2 className="text-2xl font-bold mb-6">Similar Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedEvents.map((event) => (
                    <Link to={`/event/${event.id}`} key={event.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-all duration-300">
                        <div className="mb-4">
                            <div className="bg-gray-200 rounded-lg h-40 overflow-hidden">
                                <img
                                    src={event.images && event.images[0] ? event.images[0].url : 'placeholder-image-url'}
                                    alt={event.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold hover:text-indigo-600 transition-colors duration-300 mb-2">{event.name}</h3>
                            <div className="text-gray-600 flex items-center mb-2">
                                <FaCalendarAlt className="mr-2" />
                                {event.dates && event.dates.start ? new Date(event.dates.start.dateTime).toLocaleDateString() : 'Date TBA'}
                            </div>
                            <div className="text-gray-600 flex items-center">
                                <FaMapMarkerAlt className="mr-2" />
                                {event._embedded && event._embedded.venues && event._embedded.venues[0] ? event._embedded.venues[0].name : 'Venue TBA'}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EventList;