import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchNavBar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SearchFilter from '../components/SearchFilter';
import { performSearch } from '../redux/searchSlice';

const ITEMS_PER_PAGE = 20;

const SearchResults = () => {
    const dispatch = useDispatch();
    const { results, loading, error } = useSelector((state) => state.search);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredResults, setFilteredResults] = useState([]);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedDate('');
        setSelectedPrice('');
    };

    useEffect(() => {
        setCurrentPage(1);
        applyFilters();
    }, [results, selectedCategory, selectedDate, selectedPrice]);

    const applyFilters = () => {
        let filtered = [...results];

        if (selectedCategory) {
            filtered = filtered.filter(event => event.classifications && event.classifications[0].segment.name === selectedCategory);
        }

        if (selectedDate) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            const nextMonth = new Date(today);
            nextMonth.setMonth(nextMonth.getMonth() + 1);

            filtered = filtered.filter(event => {
                const eventDate = new Date(event.dates.start.dateTime);
                switch (selectedDate) {
                    case 'Today':
                        return eventDate.toDateString() === today.toDateString();
                    case 'Tomorrow':
                        return eventDate.toDateString() === tomorrow.toDateString();
                    case 'This weekend':
                        return eventDate >= today && eventDate <= nextWeek && (eventDate.getDay() === 0 || eventDate.getDay() === 6);
                    case 'This week':
                        return eventDate >= today && eventDate <= nextWeek;
                    case 'Next week':
                        return eventDate > nextWeek && eventDate <= new Date(nextWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
                    case 'This month':
                        return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
                    case 'Next month':
                        return eventDate >= nextMonth && eventDate < new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
                    default:
                        return true;
                }
            });
        }

        if (selectedPrice) {
            filtered = filtered.filter(event => {
                if (selectedPrice === 'Free') {
                    return event.priceRanges && event.priceRanges[0].min === 0;
                } else if (selectedPrice === 'Paid') {
                    return event.priceRanges && event.priceRanges[0].min > 0;
                }
                return true;
            });
        }

        setFilteredResults(filtered);
    };

    const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex justify-center items-center space-x-2 mt-6">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
                >
                    <FaChevronLeft />
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
                >
                    <FaChevronRight />
                </button>
            </div>
        );
    };

    const renderContent = () => {
        if (loading) {
            return <div className="text-center py-8">Loading...</div>;
        }

        if (error) {
            return <div className="text-center py-8 text-red-500">Error: {error}</div>;
        }

        if (filteredResults.length === 0) {
            return <div className="text-center py-8">No results found. Try modifying your search or filters.</div>;
        }

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentItems.map((event) => (
                        <Link to={`/event/${event.id}`} key={event.id} className="bg-white rounded-lg shadow-md p-4 flex hover:shadow-lg hover:text-indigo-600 transition-colors duration-300">
                            <div className="w-1/3">
                                <div className="bg-gray-300 rounded-lg h-full overflow-hidden">
                                    <img
                                        src={event.images && event.images[0] ? event.images[0].url : 'placeholder-image-url'}
                                        alt={event.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="w-2/3 pl-4 flex flex-col justify-between">
                                <h3 className="text-lg font-bold">{event.name}</h3>
                                <div className="text-gray-600 flex items-center mt-2">
                                    <FaCalendarAlt className="mr-2" />
                                    {event.dates && event.dates.start ? new Date(event.dates.start.dateTime).toLocaleDateString() : 'Date TBA'}
                                </div>
                                <div className="text-gray-600 flex items-center mt-2">
                                    <FaMapMarkerAlt className="mr-2" />
                                    {event._embedded && event._embedded.venues && event._embedded.venues[0] ? event._embedded.venues[0].name : 'Venue TBA'}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {renderPagination()}
            </>
        );
    };

    return (
        <>
            <SearchNavBar />
            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 gap-6">
                <SearchFilter
                    setCategory={setSelectedCategory}
                    setDate={setSelectedDate}
                    setPrice={setSelectedPrice}
                    clearFilters={clearFilters}
                />
                <div className="w-full lg:w-3/4 mb-24">
                    {renderContent()}
                </div>
            </div>
            <UpcomingEventsSection />
            <Footer />
        </>
    );
}

export default SearchResults;