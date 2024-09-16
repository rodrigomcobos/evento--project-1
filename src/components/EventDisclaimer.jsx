import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

// Accordion data
const accordionData = [
    {
        question: 'Where can I buy tickets for this event?',
        answer: 'Tickets for upcoming concerts can be found at Evento. As the largest provider of event tickets in the world, Evento is your source for all the information you need to catch on this event and other upcoming events.',
    },
    {
        question: 'Are tickets guaranteed on Evento?',
        answer: `Every order is 100% guaranteed on Evento. Evento’s exclusive Guarantee ensures valid tickets or your money back.`,
    },
    {
        question: 'How long does it take to get my tickets after purchase?',
        answer: `You'll get your tickets by your event day or the date on your order\'s expected arrival date - whichever comes first.`,
    },
    {
        question: 'Will Evento seat you together?',
        answer: 'Yes, when you buy tickets on Evento, your seats are guaranteed to be together.',
    },
    {
        question: 'What happens if my event is canceled?',
        answer: `We'll email you when an event is canceled. We’ll add a credit worth 100% of the total amount you paid for the impacted event. We will process the refund to your original payment method within 5 days.`,
    },
    {
        question: 'What happens if my event is rescheduled?',
        answer: `We'll email you when the details are confirmed and will include any info we have on the rescheduled date in the email. Although Evento isn't responsible for event date changes, if you can't attend the new date, you can resell your tickets and give someone else the chance to go.`,
    },
];
const EventDisclaimer = () => {
    // Manage which section is currently open
    const [activeIndex, setActiveIndex] = useState(null);

    // Toggle function to open/close accordion
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // If it's already open, close it
    };

    return (
        <div className="divide-y rounded-lg max-w-6xl mx-auto px-4 pb-24">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Frequently asked questions</h2>
            </div>
            <section className='px-4'>
                {accordionData.map((item, index) => (
                    <div role="accordion" key={index}>
                        <button
                            type="button"
                            className="w-full text-left font-semibold py-6 text-gray-800 flex items-center"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className="mr-4 text-lg">{item.question}</span>
                            <div className="w-3.5 fill-current ml-auto shrink-0">
                                {activeIndex === index ? <FaMinus /> : <FaPlus />}
                            </div>
                        </button>
                        <div className={`py-4 ${activeIndex === index ? 'block' : 'hidden'}`}>
                            <p className="text-md text-gray-800">{item.answer}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default EventDisclaimer;