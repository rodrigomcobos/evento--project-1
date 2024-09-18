import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

// ReviewCard Component
const ReviewCard = ({ name, stars, comment, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-[800px]">
            <div className="flex justify-between items-center mb-2">
                <div>
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
                <div className="flex space-x-2">
                    <button
                        onClick={onEdit}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
            <p className="text-gray-600">{comment}</p>
        </div>
    );
};

// MyReviews Component
const MyReviews = () => {
    // Dummy review data
    const [reviews, setReviews] = useState([
        {
            name: 'John Doe',
            stars: 4,
            comment: 'Had an amazing time at this event! Highly recommended.',
        },
        {
            name: 'Jane Smith',
            stars: 5,
            comment: 'Fantastic experience! Would definitely go again.',
        },
    ]);

    // Placeholder functions for Edit and Delete actions
    const handleEdit = (index) => {
        console.log(`Edit review at index: ${index}`);
    };

    const handleDelete = (index) => {
        console.log(`Delete review at index: ${index}`);
        // Logic to remove the review from state
        const updatedReviews = reviews.filter((_, i) => i !== index);
        setReviews(updatedReviews);
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">My Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <ReviewCard
                        key={index}
                        name={review.name}
                        stars={review.stars}
                        comment={review.comment}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                    />
                ))
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <FaStar className="text-gray-300 text-4xl mb-4 mx-auto" />
                    <h3 className="text-lg font-semibold mb-2">No Reviews</h3>
                    <p className="text-gray-600">
                        Reviews you submit will appear here. Share your experience with the community!
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyReviews;