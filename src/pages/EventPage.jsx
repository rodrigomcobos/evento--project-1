import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchNavbar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import EventDetails from '../components/EventDetails';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import EventSeatModal from '../components/EventSeatModal';
import EventDisclaimer from '../components/EventDisclaimer';
import ReviewList from '../components/ReviewList';

const EventPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/ticketmaster/events/${id}`);
                setEvent(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching event details:", err);
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <SearchNavbar />
            {event && <EventDetails event={event} openModal={openModal} />}
            <ReviewList />
            <EventDisclaimer />
            <UpcomingEventsSection />
            {isModalOpen && <EventSeatModal isOpen={isModalOpen} closeModal={closeModal} />}
            <Footer />
        </>
    );
};

export default EventPage;