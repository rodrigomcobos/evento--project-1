import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import PaymentForm from '../components/PaymentForm';
import PaymentConfirmation from '../components/PaymentConfirmation';
import '../CustomCSS/CustomSlider.css';

const PaymentPage = () => {
    return (
        <>
            <Navbar />
            {/* <PaymentForm /> */}
            <PaymentConfirmation />
            <Footer />
        </>
    );
};

export default PaymentPage;