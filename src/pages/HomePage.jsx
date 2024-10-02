import React from 'react'

// Components
import Navbar from '../components/NavBar';
import SearchBar from '../components/SearchBar'
import HomeSlider from '../components/HomeSlider';
import EventsSection from '../components/EventsSection';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import AdBanner from '../components/AdBanner';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <SearchBar />
            <HomeSlider />
            <EventsSection />
            <UpcomingEventsSection />
            <AdBanner />
        </>
    )
}

export default HomePage