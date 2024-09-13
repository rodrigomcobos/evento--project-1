import React from 'react'

// Components
import Navbar from '../components/NavBar';
import SearchBar from '../components/SearchBar'
import HomeSlider from '../components/HomeSlider';
import EventsSection from '../components/EventsSection';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import AdBanner from '../components/AdBanner';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <SearchBar />
            <HomeSlider />
            <EventsSection />
            <UpcomingEventsSection />
            <AdBanner />
            <Footer />
        </>
    )
}

export default HomePage