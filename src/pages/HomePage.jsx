import React from 'react'

// Components
import Navbar from '../components/NavBar';
import SearchBar from '../components/SearchBar'
import CustomSlider from '../components/Slider';
import EventsSection from '../components/EventsSection';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import AdBanner from '../components/AdBanner';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <SearchBar />
            <CustomSlider />
            <EventsSection />
            <UpcomingEventsSection />
            <AdBanner />
            <Footer />
        </>
    )
}

export default HomePage