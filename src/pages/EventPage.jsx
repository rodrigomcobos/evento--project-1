import React from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import EventDetails from '../components/EventDetails'
import UpcomingEventsSection from '../components/UpcomingEventsSection'

const EventPage = () => {
    return (
        <div>
            <Navbar />
            <EventDetails />
            <UpcomingEventsSection />
            <Footer />
        </div>
    )
}

export default EventPage