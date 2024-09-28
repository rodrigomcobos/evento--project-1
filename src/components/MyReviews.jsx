import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { fetchUserReviews, deleteReview } from '../redux/reviewSlice';
import ReviewModal from './ReviewModal';

const ReviewCard = ({ title, stars, comment, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
                <p className='text-indigo-500 text-xl font-bold'>"{title}"</p>
                <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                            key={index}
                            className={index < stars ? 'text-yellow-500' : 'text-gray-300'}
                        />
                    ))}
                </div>
            </div>
            <p className="text-gray-600 text-md mb-4">{comment}</p>
            <div className="flex space-x-2">
                <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                </button>
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

const MyReviews = () => {
    const dispatch = useDispatch();
    const { reviews, loading, error } = useSelector(state => state.review);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState(null);

    useEffect(() => {
        dispatch(fetchUserReviews());
    }, [dispatch]);

    const handleEdit = (review) => {
        setReviewToEdit(review);
        setIsModalOpen(true);
    };

    const handleDelete = async (reviewId) => {
        try {
            await dispatch(deleteReview(reviewId)).unwrap();
            dispatch(fetchUserReviews());
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReviewToEdit(null);
        dispatch(fetchUserReviews());
    };

    if (loading) return <div>Loading your reviews...</div>;
    if (error) return <div>Error loading reviews: {error}</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">My Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        title={review.title || `Review for Event ID: ${review.event_id}`}
                        stars={review.rating}
                        comment={review.comment}
                        onEdit={() => handleEdit(review)}
                        onDelete={() => handleDelete(review.id)}
                    />
                ))
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <FaStar className="text-gray-300 text-4xl mb-4 mx-auto" />
                    <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                    <p className="text-gray-600">
                        You haven't written any reviews yet. Start sharing your experiences!
                    </p>
                </div>
            )}
            {isModalOpen && (
                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    eventId={reviewToEdit ? reviewToEdit.event_id : null}
                    reviewToEdit={reviewToEdit}
                />
            )}
        </div>
    );
};

export default MyReviews;