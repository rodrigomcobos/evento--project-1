import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaChair } from 'react-icons/fa';
import { fetchUpcomingEvents } from '../redux/bookingSlice';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
    const dispatch = useDispatch();
    const { upcomingEvents, loading, error } = useSelector(state => state.bookings);

    useEffect(() => {
        dispatch(fetchUpcomingEvents());
    }, [dispatch]);

    // console.log('Upcoming Events:', upcomingEvents);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Remove duplicates based on event_id
    const uniqueEvents = upcomingEvents.reduce((acc, current) => {
        const x = acc.find(item => item.event_id === current.event_id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-2">My Bookings</h1>
            <p className='mb-8 text-gray-400 text-sm'>* Purchased Bookings are non refundable. Contact us for more information.</p>
            {uniqueEvents.length > 0 ? (
                uniqueEvents.map((event) => (
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
                ))
            ) : (
                <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
                    <FaTicketAlt className="text-6xl text-indigo-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Upcoming Bookings</h2>
                    <p className="text-gray-600 text-center mb-4">
                        Tickets you buy will automatically appear here. Browse events to find tickets to something awesome.
                    </p>
                    <Link to="/events" className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition duration-300">
                        Browse Events
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UpcomingEvents;