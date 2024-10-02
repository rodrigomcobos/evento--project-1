import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventReviews } from '../redux/reviewSlice';

// react-icons
import { FaStar } from 'react-icons/fa';
import { FaQuoteRight } from "react-icons/fa6";

const ReviewCard = ({ username, title, stars, comment }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
                <div className='flex flex-col gap-2'>
                    <h3 className="text-md text-gray-400">{username}</h3>
                    <p className='text-indigo-500 text-xl font-bold'>"{title}"</p>
                </div>

                <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                            key={index}
                            className={index < stars ? 'text-yellow-500' : 'text-gray-300'}
                        />
                    ))}
                </div>
            </div>
            <p className="text-gray-600 text-md">{comment}</p>
            <FaQuoteRight className="absolute right-4 bottom-2 text-indigo-200 opacity-50 text-7xl" />
        </div>
    );
};

const NoReviews = () => (
    <div className="text-center py-10">
        <FaQuoteRight className="mx-auto text-indigo-200 text-5xl mb-4" />
        <p className="text-xl font-semibold text-gray-600 mb-2">There are no reviews yet.</p>
        <p className="text-gray-500">Be the first one to share your experience!</p>
    </div>
);

const ReviewList = ({ eventId, openReviewModal, isUserLoggedIn }) => {
    const dispatch = useDispatch();
    const { reviews, loading } = useSelector(state => state.review);

    useEffect(() => {
        if (eventId) {
            dispatch(fetchEventReviews(eventId));
        }
    }, [dispatch, eventId]);

    return (
        <section className="max-w-6xl mx-auto mb-24 px-4">
            <div className="flex justify-between items-center align-middle mb-12">
                <h2 className='text-2xl font-bold mb-4'>Reviews</h2>
                <button
                    onClick={() => openReviewModal(eventId)}
                    className="min-w-min px-8 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                >
                    {isUserLoggedIn ? 'Write Review' : 'Sign In to Review'}
                </button>
            </div>

            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        username={review.user?.username || 'Anonymous'}
                        title={review.title}
                        stars={review.rating}
                        comment={review.comment}
                    />
                ))
            ) : (
                <NoReviews />
            )}
        </section>
    );
};

export default ReviewList;