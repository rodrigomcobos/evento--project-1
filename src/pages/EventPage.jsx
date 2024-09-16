import React, { useState } from 'react';
import SearchNavbar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import EventDetails from '../components/EventDetails';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import EventSeatModal from '../components/EventSeatModal';
import EventDisclaimer from '../components/EventDisclaimer';
import ReviewList from '../components/ReviewList';

const EventPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <SearchNavbar />
            <EventDetails openModal={openModal} />
            <ReviewList />
            <EventDisclaimer />
            <UpcomingEventsSection />
            {/* Passing the isOpen prop to the EventSeatModal */}
            {/* <EventSeatModal isOpen={isModalOpen} closeModal={closeModal} /> */}
            {isModalOpen && <EventSeatModal isOpen={isModalOpen} closeModal={closeModal} />}
            <Footer />
        </>
    );
};

export default EventPage;