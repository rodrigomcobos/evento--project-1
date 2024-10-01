import React, { useState } from 'react';
import '../CustomCSS/CustomSlider.css';
import TransparentLogo from '../assets/slides/transparentlogo.png';

const PaymentForm = ({ bookingDetails, onPaymentSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({
        zipCode: false,
        cardNumber: false,
        expirationDate: false,
        cvv: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateFields = () => {
        let valid = true;
        const newErrors = {
            zipCode: formData.zipCode.length !== 5,
            cardNumber: formData.cardNumber.length !== 16,
            expirationDate: !/^\d{2}\/\d{2}$/.test(formData.expirationDate),
            cvv: formData.cvv.length !== 3,
        };

        setErrors(newErrors);
        valid = !Object.values(newErrors).includes(true);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            // Generate a mock transaction ID
            const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();

            // Combine booking details with payment details
            const paymentDetails = {
                ...bookingDetails,
                ...formData,
                transactionId,
                paymentDate: new Date().toISOString(),
            };

            // console.log("Submitting payment details:", paymentDetails);
            onPaymentSuccess(paymentDetails);
        } else {
            // console.log('Validation failed!');
        }
    };

    return (
        <>
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">Checkout</h1>
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img
                            src={TransparentLogo}
                            alt="Logo"
                            className="object-cover opacity-25"
                            style={{
                                position: 'absolute',
                                bottom: '-30px',
                                right: '-30px',
                                width: '50%',
                                maxWidth: '275px',
                            }}
                        />
                    </div>
                </div>
            </section>

            <div className="font-sans bg-white p-4 pt-16 pb-32">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-12">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <h3 className="text-6xl font-extrabold bg-gradient-to-bl from-indigo-500 to-blue-400 bg-clip-text text-transparent">01</h3>
                                    <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <input type="text" name="firstName" placeholder="First name" className="px-4 py-3 border p-3 rounded-md text-md w-full" onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <input type="text" name="lastName" placeholder="Last name" className="px-4 py-3 border p-3 rounded-md text-md w-full" onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <input type="email" name="email" placeholder="Email address" className="px-4 py-3 border p-3 rounded-md text-md w-full" onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <input type="tel" name="phone" placeholder="Phone number" className="px-4 py-3 border p-3 rounded-md text-md w-full" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mt-12">
                                <div>
                                    <h3 className="text-6xl font-extrabold bg-gradient-to-bl from-indigo-500 to-blue-400 bg-clip-text text-transparent">02</h3>
                                    <h3 className="text-xl font-bold text-gray-800 mt-1">Billing Address</h3>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <input type="text" name="streetAddress" placeholder="Street address" className="px-4 py-3 border p-3 rounded-md text-md w-full" onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <input type="text" name="city" placeholder="City" className="px-4 py-3 border p-3 rounded-md text-md w-full" onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <input type="text" name="state" placeholder="State" className="px-4 py-3 border p-3 rounded-md text-md w-full" onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <input type="text" name="zipCode" placeholder="Zip Code" maxLength="5" className={`px-4 py-3 border p-3 rounded-md text-md w-full ${errors.zipCode ? 'border-red-500' : ''}`} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mt-12">
                                <div>
                                    <h3 className="text-6xl font-extrabold bg-gradient-to-bl from-indigo-500 to-blue-400 bg-clip-text text-transparent">03</h3>
                                    <h3 className="text-xl font-bold text-gray-800 mt-1">Payment method</h3>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="flex items-center">
                                            <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                                <img src="https://www.discoversignage.com/uploads/25-05-23_10:43_4-Logo_US_Amex(3)1.png" className="w-full h-14" alt="card3" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-4 gap-4 mt-4">
                                        <div className="col-span-2">
                                            <input type="text" name="cardNumber" maxLength="16" placeholder="xxxx xxxx xxxx xxxx" className={`px-4 py-3 border p-3 rounded-md text-md w-full ${errors.cardNumber ? 'border-red-500' : ''}`} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <input type="text" name="expirationDate" placeholder="MM/YY" maxLength="5" className={`px-4 py-3 border p-3 rounded-md text-md w-full ${errors.expirationDate ? 'border-red-500' : ''}`} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <input type="text" name="cvv" maxLength="3" placeholder="CVV" className={`px-4 py-3 border p-3 rounded-md text-md w-full ${errors.cvv ? 'border-red-500' : ''}`} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-end gap-4 mt-12">
                                <button type="submit" className="min-w-min px-8 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">Pay now</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PaymentForm;