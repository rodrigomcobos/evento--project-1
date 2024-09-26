import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaEdit, FaCalendarAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { ImSpinner2 } from 'react-icons/im';
import SearchNavBar from '../components/SearchNavBar'
import LoadingPage from '../components/LoadingPage';
import Footer from '../components/Footer'
import TransparentLogo from '../assets/slides/transparentlogo.png'

const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const ShowAllEvents = () => {
    const location = useLocation();
    const [eventCategory, setEventCategory] = useState('All Events');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({ city: 'Loading...', state: '', lat: null, lon: null });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const dropdownRef = useRef(null);
    const cacheRef = useRef({});

    const categories = [
        { name: 'All Events', id: null },
        { name: 'Sports', id: 'KZFzniwnSyZfZ7v7nE' },
        { name: 'Music', id: 'KZFzniwnSyZfZ7v7nJ' },
        { name: 'Arts & Theatre', id: 'KZFzniwnSyZfZ7v7na' },
        { name: 'Film', id: 'KZFzniwnSyZfZ7v7nn' },
        { name: 'Miscellaneous', id: 'KZFzniwnSyZfZ7v7n1' },
    ];

    const getCategoryId = (category) => {
        switch (category) {
            case 'Sports':
                return 'KZFzniwnSyZfZ7v7nE';
            case 'Music':
                return 'KZFzniwnSyZfZ7v7nJ';
            case 'Arts & Theatre':
                return 'KZFzniwnSyZfZ7v7na';
            case 'Film':
                return 'KZFzniwnSyZfZ7v7nn';
            case 'Miscellaneous':
                return 'KZFzniwnSyZfZ7v7n1';
            default:
                return null;
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category') || 'All Events';
        setEventCategory(category);
    }, [location]);

    useEffect(() => {
        if (currentLocation.lat && currentLocation.lon) {
            fetchEvents(currentLocation.lat, currentLocation.lon);
        } else {
            getUserLocation();
        }
    }, [eventCategory, currentLocation.lat, currentLocation.lon]);

    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => fetchLocationName(position.coords.latitude, position.coords.longitude),
                error => {
                    console.error("Error getting location:", error);
                    setCurrentLocation({ city: 'Lehi', state: 'UT', lat: 40.3916, lon: -111.8508 });
                }
            );
        } else {
            setCurrentLocation({ city: 'Lehi', state: 'UT', lat: 40.3916, lon: -111.8508 });
        }
    };

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
            setCurrentLocation({ city: name, state, lat, lon });
        } catch (error) {
            console.error("Error fetching location name:", error);
            setCurrentLocation({ city: 'Lehi', state: 'UT', lat: 40.3916, lon: -111.8508 });
        }
    };

    const fetchEvents = async (lat, lon) => {
        setLoading(true);
        const cacheKey = `${eventCategory},${lat},${lon}`;
        const cachedData = cacheRef.current[cacheKey];

        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            setEvents(cachedData.events);
            setLoading(false);
            return;
        }

        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('.')[0] + "Z";

            const params = {
                latlong: `${lat},${lon}`,
                radius: '100',
                unit: 'miles',
                size: 20,
                sort: 'date,asc',
                startDateTime: formattedDate,
            };

            const categoryId = getCategoryId(eventCategory);
            if (categoryId) {
                params.segmentId = categoryId;
            }

            const response = await axios.get('http://localhost:5001/api/ticketmaster/events', { params });

            const fetchedEvents = response.data._embedded?.events || [];
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
                setCurrentLocation({ city: name, state: state || '', lat, lon });
                setIsDropdownOpen(false);
            } else {
                setError('Location not found');
            }
        } catch (error) {
            console.error("Error searching location:", error);
            setError('Failed to search location');
        }
    };

    useEffect(() => {
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

    if (loading) return <LoadingPage />;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <SearchNavBar />
            {/* All Events Title Strip */}
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">{eventCategory}</h1>

                    {/* Transparent logo positioned at the bottom right */}
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img
                            src={TransparentLogo}
                            alt="Logo"
                            className="object-cover opacity-25%"
                            style={{
                                position: 'absolute',
                                bottom: '-30px',
                                right: '-30px',
                                width: '50%',
                                maxWidth: '275px',
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Category Links */}
            <section className="max-w-6xl mx-auto mt-8 px-4">
                <div className="flex justify-center space-x-4 gap-4 flex-wrap">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to={`/events${category.id ? `?category=${category.name}` : ''}`}
                            className={`px-4 py-2 rounded-full transition-colors duration-300 ${eventCategory === category.name
                                ? 'bg-indigo-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
                                }`}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </section>

            <section className="max-w-6xl mx-auto mt-24 mb-24">
                <section className="flex items-center justify-between px-4 mb-9">
                    <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
                        <h2 className="text-2xl font-bold">{eventCategory} happening near</h2>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="text-indigo-500 border-2 border-indigo-500 rounded-full px-4 py-2 flex items-center hover:bg-gradient-to-r from-indigo-600 to-blue-400 hover:text-white font-bold transition duration-300 text-md w-auto"
                        >
                            {currentLocation.city}, {currentLocation.state} <FaEdit className="ml-2" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Enter city or zip code"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <button
                                        onClick={handleLocationSearch}
                                        className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300"
                                    >
                                        <FaSearch className="inline mr-2" />
                                        Search
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
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

            <Footer />
        </>
    )
}

export default ShowAllEvents;