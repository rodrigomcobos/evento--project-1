import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import axios from 'axios';

const UpcomingEventsSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Format the current date to the required format
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('.')[0] + "Z";

                const response = await axios.get('http://localhost:5001/api/ticketmaster/events', {
                    params: {
                        size: 3,
                        sort: 'date,asc',
                        startDateTime: formattedDate
                    }
                });
                setEvents(response.data._embedded.events);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError('Failed to fetch events');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="max-w-6xl mx-auto mb-14">
            <div className="mx-auto">
                <div className="flex items-center justify-between px-4 mb-8">
                    <h2 className="text-2xl font-bold">Upcoming Events</h2>
                    <a href="#upcoming-events" className="hover:text-indigo-500 transition duration-300 text-md font-bold">
                        See all upcoming events
                    </a>
                </div>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10">
                        {events.map((event) => (
                            <div className='border-[10px] border-white' key={event.id}>
                                <a href={event.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg hover:text-indigo-600">
                                    <img
                                        src={event.images[0].url}
                                        alt={event.name}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />

                                    <h3 className="font-bold text-lg mb-2">
                                        {event.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-4">
                                        Hosted By: {event._embedded.venues[0].name}
                                    </p>

                                    <div className="flex items-center mb-2 text-gray-600 text-md">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>{new Date(event.dates.start.dateTime).toLocaleString()}</span>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default UpcomingEventsSection;