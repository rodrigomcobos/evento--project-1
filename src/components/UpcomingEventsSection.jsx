import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import axios from 'axios';
import { ImSpinner2 } from 'react-icons/im';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const UpcomingEventsSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Check if we have cached data
                const cachedData = localStorage.getItem('upcomingEvents');
                const cachedTimestamp = localStorage.getItem('upcomingEventsTimestamp');

                if (cachedData && cachedTimestamp) {
                    const now = new Date().getTime();
                    if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
                        setEvents(JSON.parse(cachedData));
                        setLoading(false);
                        return;
                    }
                }

                // If no valid cached data, fetch from API
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('.')[0] + "Z";

                const response = await axios.get('http://localhost:5001/api/ticketmaster/events', {
                    params: {
                        size: 3,
                        sort: 'date,asc',
                        startDateTime: formattedDate
                    }
                });

                const fetchedEvents = response.data._embedded.events;
                setEvents(fetchedEvents);
                setLoading(false);

                // Cache the fetched data
                localStorage.setItem('upcomingEvents', JSON.stringify(fetchedEvents));
                localStorage.setItem('upcomingEventsTimestamp', new Date().getTime().toString());
            } catch (err) {
                console.error("Error fetching events:", err);
                setError('Failed to fetch events');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <ImSpinner2 className="animate-spin text-black text-4xl" />
        </div>
    );
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="max-w-6xl mx-auto mb-14">
            <div className="mx-auto">
                <div className="flex items-center justify-between px-4 mb-8">
                    <h2 className="text-2xl font-bold">Upcoming Events</h2>
                    <Link to="/events" className="hover:text-indigo-500 transition duration-300 text-md font-bold">
                        See all upcoming events
                    </Link>
                </div>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10">
                        {events.map((event) => (
                            <div className='border-[10px] border-white' key={event.id}>
                                <Link to={`/event/${event.id}`} className="block bg-white rounded-lg hover:text-indigo-600">
                                    <img
                                        src={event.images[0].url}
                                        alt={event.name}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />

                                    <h3 className="font-bold text-lg mb-2">
                                        {event.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-4">
                                        Hosted By: {event._embedded?.venues?.[0]?.name || 'Venue not specified'}
                                    </p>

                                    <div className="flex items-center mb-2 text-gray-600 text-md">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>{new Date(event.dates.start.dateTime).toLocaleString()}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default UpcomingEventsSection;