import React, { useState } from 'react';
import SearchNavBar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import SearchFilter from '../components/SearchFilter';

const SearchResults = () => {

    return (
        <>
            <SearchNavBar />
            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 gap-6">
                {/* Left Filter Column */}
                <SearchFilter />

                {/* Right Results Column */}
                <div className="w-full lg:w-3/4 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mockup Result Cards */}
                        {Array(4).fill(0).map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex">
                                <div className="w-1/3">
                                    <div className="bg-gray-300 rounded-lg h-full">
                                        {/* Image placeholder */}
                                        <img src="https://via.placeholder.com/150" alt="Event" className="rounded-lg" />
                                    </div>
                                </div>
                                <div className="w-2/3 pl-4 flex flex-col justify-between">
                                    <h3 className="text-lg font-bold">Event Title {index + 1}</h3>
                                    <div className="text-gray-600 flex items-center mt-2">
                                        <FaCalendarAlt className="mr-2" />
                                        May 18, 2024
                                    </div>
                                    <div className="text-gray-600 flex items-center mt-2">
                                        <FaMapMarkerAlt className="mr-2" />
                                        Salt Lake City, UT
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <UpcomingEventsSection />
            <Footer />
        </>
    );
}

export default SearchResults;