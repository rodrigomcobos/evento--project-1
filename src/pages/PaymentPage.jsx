import React, { useState } from 'react';
import SearchNavbar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import PaymentForm from '../components/PaymentForm';
import PaymentConfirmation from '../components/PaymentConfirmation';
import BookingConfirmation from '../components/BookingConfirmation';
import '../CustomCSS/CustomSlider.css';

const PaymentPage = () => {
    return (
        <>
            <SearchNavbar />
            {/* Step 1: Confirm booking information */}
            {/* <BookingConfirmation /> */}


            {/* Step 2: Make payment */}
            {/* <PaymentForm /> */}


            {/* Step 3: Payment confirmation with confirmation number */}
            <PaymentConfirmation />
            <Footer />
        </>
    );
};

export default PaymentPage;