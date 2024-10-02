import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPastEvents } from '../redux/bookingSlice';

// react-icons
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaChair } from 'react-icons/fa';

const PastEvents = () => {
    const dispatch = useDispatch();
    const { pastEvents, loading, error } = useSelector(state => state.bookings);

    // Fetch past events on mount
    useEffect(() => {
        console.log('PastEvents useEffect running');
        dispatch(fetchPastEvents());
    }, [dispatch]);

    // Use Set to ensure unique events before rendering the events
    const uniqueEvents = useMemo(() => {
        return Array.from(new Set(pastEvents.map(JSON.stringify))).map(JSON.parse);
    }, [pastEvents]);

    // Use Set to ensure unique events before rendering the events, for some reason they are rendering twice, the set should stop that
    const renderedEvents = useMemo(() => {
        console.log('PastEvents rendering events, count:', uniqueEvents.length);
        return uniqueEvents.map((event) => (
            <div key={event.id} className="flex bg-white shadow-md rounded-lg overflow-hidden mb-6">
                <div className="w-1/2">
                    <img
                        src={event.image_url}
                        alt="Event"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-grow p-6">
                    <h2 className="text-2xl font-bold mb-2">{event.event_name}</h2>
                    <p className="text-gray-600 mb-2">Confirmation ID: {event.transaction_id}</p>
                    <div className="text-gray-600 mb-2">
                        <FaCalendarAlt className="inline mr-2" /> {new Date(event.event_date).toLocaleDateString()}
                    </div>
                    <div className="text-gray-600 mb-2">
                        <FaClock className="inline mr-2" /> {event.event_time}
                    </div>
                    <div className="text-gray-600 mb-2">
                        <FaMapMarkerAlt className="inline mr-2" /> {event.event_location}
                    </div>
                    <div className="text-gray-600 mb-2">
                        <FaTicketAlt className="inline mr-2" /> {event.ticket_quantity} Tickets
                    </div>
                    <div className="text-gray-600">
                        <FaChair className="inline mr-2" /> Seat: {event.seat_zone}{event.zone_number}
                    </div>
                </div>
            </div>
        ));
    }, [uniqueEvents]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-8">Past Events</h1>
            {uniqueEvents.length > 0 ? renderedEvents : (
                <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 py-14">
                    <FaTicketAlt className="text-6xl text-indigo-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Past Bookings</h2>
                    <p className="text-gray-600 text-center mb-4">
                        Your past event bookings will appear here once you've attended them.
                    </p>
                    <Link to="/events" className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition duration-300">
                        Browse Events
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PastEvents;