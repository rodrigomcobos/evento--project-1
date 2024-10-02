import React, { useState, useEffect } from 'react';
import { searchEvents } from '../services/ticketmasterApi';

const TicketmasterTest = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events on component mount using Ticketmaster API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Search events for New York, June 1st, 2023
                const result = await searchEvents({
                    city: 'New York',
                    startDateTime: '2023-06-01T00:00:00Z',
                    size: 10
                });
                // Set the fetched events
                setEvents(result._embedded?.events || []);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err.message || 'An error occurred while fetching events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Ticketmaster Events</h2>
            {events.length === 0 ? (
                <p>No events found</p>
            ) : (
                <ul>
                    {events.map(event => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TicketmasterTest;