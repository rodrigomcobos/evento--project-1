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
        <div>
            <Navbar />
            <div className="mt-6">
                <SearchBar />
                <CustomSlider />
                <EventsSection />
                <UpcomingEventsSection />
                <AdBanner />
                <Footer />
            </div>
        </div>

    )
}

export default HomePage