import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaChair } from 'react-icons/fa';
import Placeholder from '../assets/slides/slide-1.png';

const UpcomingEvents = () => {
    // Initial state with one mock event
    const [bookedEvents, setBookedEvents] = useState([
        {
            title: 'Live Concert',
            date: '2024-10-15',
            time: '7:00 PM',
            location: 'Madison Square Garden, NY',
            tickets: 2,
            seats: 'A12, A13',
            imageUrl: Placeholder, // Placeholder image path
        }
    ]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-2">My Bookings</h1>
            <p className='mb-8 text-gray-400 text-sm'>* Purchased Bookings are non refundable. Contact us for more information.</p>
            {/* Check if there are booked events */}
            {bookedEvents.length > 0 ? (
                bookedEvents.map((event, index) => (
                    <div key={index} className="flex bg-white shadow-md rounded-lg overflow-hidden mb-6">
                        {/* Left column - Placeholder image */}
                        <div className="w-1/2">
                            <img
                                src={event.imageUrl}
                                alt="Event placeholder"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Right column */}
                        <div className="flex-grow p-6">
                            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                            <div className="text-gray-600 mb-2">
                                <FaCalendarAlt className="inline mr-2" /> {event.date}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <FaClock className="inline mr-2" /> {event.time}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <FaMapMarkerAlt className="inline mr-2" /> {event.location}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <FaTicketAlt className="inline mr-2" /> {event.tickets} Tickets
                            </div>
                            <div className="text-gray-600">
                                <FaChair className="inline mr-2" /> Seats: {event.seats}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // No upcoming events booked
                <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
                    <FaTicketAlt className="text-6xl text-indigo-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Upcoming Bookings</h2>
                    <p className="text-gray-600 text-center mb-4">
                        Tickets you buy will automatically appear here. Browse events to find tickets to something awesome.
                    </p>
                    <button className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition duration-300">
                        Browse Events
                    </button>
                </div>
            )}
        </div>
    );
};

export default UpcomingEvents;