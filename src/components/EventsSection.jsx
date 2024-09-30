import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaCalendarAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { ImSpinner2 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { BsEmojiDizzy } from "react-icons/bs";



const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const EventsSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState({ city: 'Loading...', state: '' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const dropdownRef = useRef(null);
    const cacheRef = useRef({});

    useEffect(() => {
        const getUserLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => fetchLocationName(position.coords.latitude, position.coords.longitude),
                    error => {
                        console.error("Error getting location:", error);
                        setLocation({ city: 'Salt Lake City', state: 'Utah' });
                        fetchEvents(40.7608, -111.8910);
                    }
                );
            } else {
                setLocation({ city: 'Salt Lake City', state: 'Utah' });
                fetchEvents(40.7608, -111.8910);
            }
        };

        getUserLocation();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchLocationName = async (lat, lon) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse`, {
                params: {
                    lat,
                    lon,
                    limit: 1,
                    appid: OPENWEATHERMAP_API_KEY
                }
            });
            const { name, state } = response.data[0];
            setLocation({ city: name, state });
            fetchEvents(lat, lon);
        } catch (error) {
            console.error("Error fetching location name:", error);
            setLocation({ city: 'Salt Lake City', state: 'Utah' });
            fetchEvents(40.7608, -111.8910);
        }
    };

    const fetchEvents = async (lat, lon) => {
        const cacheKey = `${lat},${lon}`;
        const cachedData = cacheRef.current[cacheKey];

        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            setEvents(cachedData.events);
            setLoading(false);
            return;
        }

        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('.')[0] + "Z";

            const response = await axios.get('http://localhost:5001/api/ticketmaster/events', {
                params: {
                    latlong: `${lat},${lon}`,
                    radius: '100',
                    unit: 'miles',
                    size: 6,
                    sort: 'date,asc',
                    startDateTime: formattedDate
                }
            });
            const fetchedEvents = response.data._embedded.events;
            setEvents(fetchedEvents);
            setLoading(false);

            // Cache the fetched data
            cacheRef.current[cacheKey] = {
                events: fetchedEvents,
                timestamp: Date.now()
            };
        } catch (err) {
            console.error("Error fetching events:", err);
            setError('Failed to fetch events');
            setLoading(false);
        }
    };

    const handleLocationSearch = async () => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
                params: {
                    q: searchInput,
                    limit: 1,
                    appid: OPENWEATHERMAP_API_KEY
                }
            });
            if (response.data && response.data.length > 0) {
                const { lat, lon, name, state } = response.data[0];
                setLocation({ city: name, state: state || '' });
                fetchEvents(lat, lon);
                setIsDropdownOpen(false);
            } else {
                setError('Location not found');
            }
        } catch (error) {
            console.error("Error searching location:", error);
            setError('Failed to search location');
        }
    };

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

    return (
        <section className="max-w-6xl mx-auto mt-24 mb-24">
            <section className="flex items-center justify-between px-4 mb-9">
                <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
                    <h2 className="text-2xl font-bold">Events near</h2>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-indigo-500 border-2 border-indigo-500 rounded-full px-4 py-2 flex items-center hover:bg-gradient-to-r from-indigo-600 to-blue-400 hover:text-white font-bold transition duration-300 text-md w-auto"
                    >
                        {location.city}, {location.state} <FaEdit className="ml-2" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-3xl shadow-lg z-10">
                            <div className="p-2">
                                <input
                                    type="text"
                                    placeholder="Enter city or zip code"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-full"
                                />
                                <button
                                    onClick={handleLocationSearch}
                                    className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition duration-300"
                                >
                                    <FaSearch className="inline mr-2" />
                                    Update Location
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <Link to="/explore" className="hover:text-indigo-500 transition duration-300 text-md font-bold"> See all events </Link>
                {/* <a href="#all-events" className="hover:text-indigo-500 transition duration-300 text-md font-bold">
                    See all events
                </a> */}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10">
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
                                Hosted By: {event._embedded.venues[0].name}
                            </p>

                            <div className="flex items-center mb-2 text-gray-600 text-md">
                                <FaCalendarAlt className="mr-2" />
                                <span>{new Date(event.dates.start.dateTime).toLocaleString()}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>
        </section>
    );
};

export default EventsSection;