import React from 'react';
import { FaStar } from 'react-icons/fa';

const reviews = [
    {
        name: 'John Doe',
        stars: 4,
        comment: 'Great event! Had an amazing time with friends. Highly recommended.'
    },
    {
        name: 'Jane Smith',
        stars: 5,
        comment: 'Incredible experience, the organization was top-notch. Will attend again!'
    },
];

const ReviewCard = ({ name, stars, comment }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                            key={index}
                            className={index < stars ? 'text-yellow-500' : 'text-gray-300'}
                        />
                    ))}
                </div>
            </div>
            <p className="text-gray-600">{comment}</p>
        </div>
    );
};

const ReviewList = () => {
    return (
        <section className="max-w-6xl mx-auto mb-24 px-4">
            <div className="flex justify-between items-center align-middle mb-12">
                <h2 className='text-2xl font-bold mb-4'>Reviews</h2>
                <button className="min-w-min px-8 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">
                    Write Review
                </button>
            </div>

            {reviews.slice(0, 5).map((review, index) => (
                <ReviewCard key={index} {...review} />
            ))}
        </section>
    );
};

export default ReviewList;