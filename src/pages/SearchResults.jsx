import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchNavBar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import SearchFilter from '../components/SearchFilter';

const SearchResults = () => {
    const { results, loading, error } = useSelector((state) => state.search);

    const renderContent = () => {
        if (loading) {
            return <div className="text-center py-8">Loading...</div>;
        }

        if (error) {
            return <div className="text-center py-8 text-red-500">Error: {error}</div>;
        }

        if (!Array.isArray(results) || results.length === 0) {
            return <div className="text-center py-8">No results found. Try modifying your search.</div>;
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((event) => (
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
        );
    };

    return (
        <>
            <SearchNavBar />
            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 gap-6">
                <SearchFilter />
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