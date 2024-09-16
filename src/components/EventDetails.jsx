import React, { useState, useEffect } from 'react';
import { FaStar, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import placeholderImage from '../assets/slides/slide-1.png';

const EventDetails = ({ openModal, eventLocationZip }) => {
    const [eventCoordinates, setEventCoordinates] = useState([40.7608, -111.8910]); // Default coordinates (Salt Lake City)

    // Geocode function to fetch coordinates based on the zip code or city name
    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${eventLocationZip}`
                );
                const data = await response.json();
                if (data && data.length > 0) {
                    const { lat, lon } = data[0]; // Use the first result
                    setEventCoordinates([parseFloat(lat), parseFloat(lon)]);
                }
            } catch (error) {
                console.error('Error fetching coordinates:', error);
            }
        };

        if (eventLocationZip) {
            fetchCoordinates();
        }
    }, [eventLocationZip]);

    const EventDetails = {
        name: 'Salt Lake City Annual Music Festival',
        image: placeholderImage,
        details: 'Join us for the annual music festival in Salt Lake City. Experience live performances by top artists and immerse yourself in the vibrant atmosphere. Fun, music, and memories await you!',
        date: 'May 15, 2023',
        time: '10:00 AM - 5:00 PM',
        location: eventLocationZip, // Displaying the zip code or city name
        rating: '2.1k',
        availableSeats: 100,
        capacity: 200,
    };

    return (
        <div className="flex flex-col mt-14 mb-32">
            <div className="flex flex-col max-w-7xl mx-auto md:flex-row p-6 md:px-20 md:py-10">
                {/* Left Column */}
                <section className="md:w-2/3 w-full md:pr-8 mb-10 md:mb-0">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-4">{EventDetails.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <FaStar className="text-yellow-500" />
                        <span className="ml-2 text-md text-gray-700">{EventDetails.rating}</span>
                    </div>

                    {/* Event Image */}
                    <img
                        src={EventDetails.image}
                        alt="Event"
                        className="w-full h-auto rounded-lg mb-6"
                    />

                    {/* Details */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Details</h2>
                        <p className="text-gray-600 text-md leading-relaxed">{EventDetails.details}</p>
                    </div>
                </section>

                {/* Right Column */}
                <section className="md:w-1/3 w-full bg-slate-50 p-6 rounded-lg shadow-inner shadow-gray-400 space-y-4">
                    {/* Event Date & Time */}
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-indigo-600" />
                            <span className="ml-2 text-md font-semibold">{EventDetails.date}</span>
                        </div>
                        <div className="flex items-center">
                            <FaClock className="text-indigo-600" />
                            <span className="ml-2 text-md font-semibold">{EventDetails.time}</span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-indigo-600" />
                            <span className="ml-2 text-md font-semibold">{EventDetails.location}</span>
                        </div>
                    </div>

                    {/* Mini Map */}
                    <div className="mb-4">
                        <MapContainer
                            center={eventCoordinates}
                            zoom={13}
                            style={{ height: '200px', width: '100%', zIndex: 0 }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={eventCoordinates}>
                                <Popup>{EventDetails.location}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                    {/* Capacity */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-md">Capacity: <span>{EventDetails.capacity}</span></p>
                        <p className="text-md">Available Seats: <span>{EventDetails.availableSeats}</span></p>
                    </div>

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