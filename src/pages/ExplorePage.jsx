import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchNavbar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import LoadingPage from '../components/LoadingPage';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CATEGORIES = [
    { name: 'Music', id: 'KZFzniwnSyZfZ7v7nJ' },
    { name: 'Sports', id: 'KZFzniwnSyZfZ7v7nE' },
    { name: 'Arts & Theatre', id: 'KZFzniwnSyZfZ7v7na' },
    { name: 'Film', id: 'KZFzniwnSyZfZ7v7nn' },
    { name: 'Miscellaneous', id: 'KZFzniwnSyZfZ7v7n1' },
];

const ExplorePage = () => {
    const [events, setEvents] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState({
        city: 'Salt Lake City',
        state: 'Utah',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchEventsByCategories();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [location]);

    const fetchEventsByCategories = async () => {
        setLoading(true);
        setError(null);
        const newEvents = {};

        for (const category of CATEGORIES) {
            try {
                const cachedData = localStorage.getItem(
                    `events_${category.name}_${location.city}`
                );
                const cachedTimestamp = localStorage.getItem(
                    `events_${category.name}_${location.city}_timestamp`
                );

                if (cachedData && cachedTimestamp) {
                    const now = new Date().getTime();
                    if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
                        newEvents[category.name] = JSON.parse(cachedData);
                        continue;
                    }
                }

                const response = await axios.get(
                    'http://localhost:5001/api/ticketmaster/events',
                    {
                        params: {
                            city: location.city,
                            segmentId: category.id,
                            size: 6,
                            sort: 'date,asc',
                        },
                    }
                );

                console.log(`API Response for ${category.name}:`, response.data);

                if (response.data._embedded && response.data._embedded.events) {
                    newEvents[category.name] = response.data._embedded.events;
                    localStorage.setItem(
                        `events_${category.name}_${location.city}`,
                        JSON.stringify(newEvents[category.name])
                    );
                    localStorage.setItem(
                        `events_${category.name}_${location.city}_timestamp`,
                        new Date().getTime().toString()
                    );
                } else {
                    console.log(`No events found for ${category.name}`);
                    newEvents[category.name] = [];
                }

                await new Promise((resolve) => setTimeout(resolve, 200)); // Delay to avoid rate limiting
            } catch (err) {
                console.error(`Error fetching ${category.name} events:`, err);
                newEvents[category.name] = [];
            }
        }

        console.log('All fetched events:', newEvents);
        setEvents(newEvents);
        setLoading(false);
    };

    const handleLocationSearch = async () => {
        try {
            const response = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct`,
                {
                    params: {
                        q: searchInput,
                        limit: 1,
                        appid: import.meta.env.VITE_OPENWEATHERMAP_API_KEY,
                    },
                }
            );
            if (response.data && response.data.length > 0) {
                const { name, state } = response.data[0];
                setLocation({ city: name, state: state || '' });
                setIsDropdownOpen(false);
            } else {
                setError('Location not found');
            }
        } catch (error) {
            console.error('Error searching location:', error);
            setError('Failed to search location');
        }
    };

    if (loading) return <LoadingPage />;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <SearchNavbar />
            <section className="px-4 pb-14 mt-14">
                <div className="mt-8 max-w-6xl mx-auto">
                    <div className="relative max-w-[75rem] h-[32rem] mx-auto rounded-[2rem] overflow-hidden shadow-lg">
                        <div className="relative h-[32rem] bg-right bg-cover bg-clip-border bg-events-background">
                            <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 w-3/5 sm:w-[50%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                    <p className="text-white sm:text-3xl text-lg font-semibold [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] mb-4">
                                        Best Events in
                                    </p>
                                    <h2 className="text-white [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] text-4xl sm:text-5xl font-bold mb-4 mr-14">
                                        {location.city}
                                    </h2>
                                    <p className="text-white max-w-sm mb-6 [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] text-sm sm:text-[1.05rem]">
                                        Looking for something to do in {location.city}? Whether
                                        you're a local, new in town or just cruising through we've
                                        got loads of great tips and events.
                                    </p>
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-auto max-w-fit text-md px-6 py-2 min-w-min bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                                        >
                                            <div className="flex align-middle items-center gap-2 sm:px-2">
                                                <FaMapMarkerAlt />
                                                <p>
                                                    {location.city}, {location.state}
                                                </p>
                                            </div>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {CATEGORIES.map((category) => (
                <section key={category.name} className="max-w-6xl mx-auto mt-24 mb-24">
                    <section className="flex items-center justify-between px-4 mb-9">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-2xl font-bold">{category.name}</h2>
                        </div>
                        <Link
                            to={`/events?category=${category.name}`}
                            className="hover:text-indigo-500 transition duration-300 text-md font-bold"
                        >
                            See all events
                        </Link>
                    </section>
                    <section className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10">
                        {events[category.name] && events[category.name].length > 0 ? (
                            events[category.name].map((event) => (
                                <Link
                                    to={`/event/${event.id}`}
                                    key={event.id}
                                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="border-[10px] border-white">
                                        <div className="bg-gray-200 rounded-lg h-40 overflow-hidden">
                                            <img
                                                src={event.images[0]?.url || 'placeholder-image-url'}
                                                alt={event.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 mt-4 hover:text-indigo-600 transition-colors duration-300">
                                            {event.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Hosted by:{' '}
                                            {event._embedded?.venues?.[0]?.name ||
                                                'Venue not specified'}
                                        </p>
                                        <div className="flex items-center mb-2 text-gray-600 text-md">
                                            <FaCalendarAlt className="mr-2" />
                                            <span>
                                                {new Date(event.dates.start.dateTime).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>No events found for {category.name}</div>
                        )}
                    </section>
                </section>
            ))}

            <Footer />
        </>
    );
};

export default ExplorePage;
