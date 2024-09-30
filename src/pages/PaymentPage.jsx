import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchNavbar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import BookingConfirmation from '../components/BookingConfirmation';
import PaymentForm from '../components/PaymentForm';
import PaymentConfirmation from '../components/PaymentConfirmation';

const PaymentPage = () => {
    const [currentStep, setCurrentStep] = useState('booking');
    const location = useLocation();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        if (location.state && location.state.bookingDetails) {
            setBookingDetails(location.state.bookingDetails);
        }
    }, [location.state]);

    const handlePaymentSuccess = (details) => {
        console.log("Payment details received:", details);
        setPaymentDetails(details);
        setCurrentStep('confirmation');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'booking':
                return bookingDetails ? (
                    <BookingConfirmation
                        bookingDetails={bookingDetails}
                        onConfirm={() => setCurrentStep('payment')}
                    />
                ) : (
                    <div>No booking details available</div>
                );
            case 'payment':
                return <PaymentForm
                    bookingDetails={bookingDetails}
                    onPaymentSuccess={handlePaymentSuccess}
                />;
            case 'confirmation':
                return <PaymentConfirmation paymentDetails={paymentDetails} />;
            default:
                return <div>Invalid step</div>;
        }
    };

    return (
        <>
            <SearchNavbar />
            {renderStep()}
            <Footer />
        </>
    );
};

export default PaymentPage;