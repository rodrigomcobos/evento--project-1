import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// react-icons
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Components
import SearchNavBar from '../components/SearchNavBar';
import TransparentLogo from '../assets/slides/transparentlogo.png';

const AccordionItem = ({ title, content, isOpen, toggleAccordion }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full py-4 px-6 text-left"
                onClick={toggleAccordion}
            >
                <span className="font-semibold">{title}</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOpen && (
                <div className="py-4 px-6">
                    {content.map((item, index) => (
                        <p key={index} className="mb-2">{item}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

const PurchasePolicy = () => {
    const [openSections, setOpenSections] = useState({});

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const policyContent = [
        {
            title: "1. General Terms",
            content: [
                "• By purchasing a ticket through Evento, you agree to these terms and conditions, along with any additional terms presented to you during the purchase process.",
                "• All ticket sales are final. There are no refunds, exchanges, or cancellations, except as provided under this policy or required by applicable law."
            ]
        },
        {
            title: "2. Pricing and Availability",
            content: [
                "• Ticket prices are determined by the event organizer and may be subject to change. Evento does not control these prices and may charge service fees in addition to the ticket price.",
                "• Tickets are sold on a first-come, first-served basis, and availability is not guaranteed until the purchase is completed.",
                "• Some tickets may be sold through dynamic pricing, where prices fluctuate based on demand."
            ]
        },
        {
            title: "3. Order Confirmation",
            content: [
                "• After placing an order, you will receive a confirmation email with your ticket(s) attached. If you do not receive the confirmation, or if you encounter any issues, please contact us immediately via our Contact Form.",
                "• It is your responsibility to ensure that the information you provide during the purchase process is accurate, including your email address."
            ]
        },
        {
            title: "4. Ticket Delivery",
            content: [
                "• All tickets will be delivered electronically through the method specified during checkout (e.g., mobile tickets, print-at-home, etc.).",
                "• If there are any issues with your ticket delivery, please contact us through the Contact Form for assistance."
            ]
        },
        {
            title: "5. Ticket Resale and Transfer",
            content: [
                "• Tickets purchased through Evento may not be resold or transferred for a profit unless expressly authorized by the event organizer.",
                "• Unauthorized resale or transfer of tickets may result in cancellation of the ticket without a refund and refusal of entry to the event.",
                "• Some events may offer the option to transfer tickets to other individuals. If ticket transfer is available, you will be provided with instructions on how to do so."
            ]
        },
        {
            title: "6. Event Cancellations, Postponements, and Changes",
            content: [
                "• In the event of a cancellation, postponement, or material change to the event, we will notify you via email with further instructions.",
                "• If an event is canceled, you will typically receive a refund for the face value of the ticket. Service fees and other non-refundable charges may not be refunded.",
                "• For postponed or rescheduled events, your original ticket will usually be valid for the new date. Refunds may not be available for rescheduled events."
            ]
        },
        {
            title: "7. Refunds and Exchanges",
            content: [
                "• Unless the event is canceled or rescheduled, all sales are final. No refunds or exchanges will be issued after a ticket is purchased, except as required by applicable law.",
                "• If an event is canceled and refunds are available, you will be refunded through the original payment method."
            ]
        },
        {
            title: "8. Event Entry and Admission",
            content: [
                "• Admission to an event is subject to the rules and regulations of the event venue and the event organizer. You must adhere to all entry requirements, which may include security checks or health and safety protocols.",
                "• Evento is not responsible for the refusal of admission to an event or the removal of attendees from an event for any reason, including misconduct or violation of venue policies."
            ]
        },
        {
            title: "9. Limitation of Liability",
            content: [
                "• Evento is not responsible for any loss, injury, or damages incurred while attending an event. Your attendance at an event is at your own risk, and you are responsible for your safety and well-being.",
                "• Evento is not liable for any indirect, incidental, or consequential damages related to your ticket purchase or attendance at an event."
            ]
        },
        {
            title: "10. Contact Us",
            content: [
                "• If you have any questions or concerns regarding your ticket purchase, please contact us through our Contact Form. We aim to respond to inquiries as quickly as possible and will work with you to resolve any issues."
            ]
        },
    ];

    return (
        <div>
            <SearchNavBar />
            {/* PurchasePolicy Strip */}
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">Purchase Policy</h1>

                    {/* Transparent logo positioned at the bottom right */}
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img
                            src={TransparentLogo}
                            alt="Logo"
                            className="object-cover opacity-25%"
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

            <section className="max-w-6xl mx-auto mt-8 mb-16 px-6">
                <p className="text-gray-600 mb-6">
                    Thank you for purchasing tickets through Evento. Please carefully read our Purchase Policy, as it explains important information regarding your purchase and your responsibilities.
                </p>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {policyContent.map((section, index) => (
                        <AccordionItem
                            key={index}
                            title={section.title}
                            content={section.content}
                            isOpen={openSections[section.title] || false}
                            toggleAccordion={() => toggleSection(section.title)}
                        />
                    ))}
                </div>

                <p className="text-gray-600 mt-6">
                    By completing your purchase with Evento, you acknowledge and accept these terms. And remember, this is not a real company, these terms are just made for show. This is a full stack project for learning purposes.
                </p>
                <h4 className="text-gray-600 mt-14 text-center text-lg">Need more Help?</h4>
                <div className="flex justify-center">
                    <Link to="/contact" className="mt-4 w-auto max-w-fit text-md px-6 py-2 bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PurchasePolicy;