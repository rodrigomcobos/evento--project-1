import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';

const ReviewModal = ({ isOpen, onClose }) => {
    const [nickname, setNickname] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const maxNicknameChars = 40;
    const maxTitleChars = 60;
    const maxReviewChars = 5000;

    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes size={24} />
                </button>

                {/* Modal Header */}
                <h2 className="text-xl font-semibold mb-4">Write Your Review</h2>

                {/* Rating Section */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">1. Select Your Rating</h3>
                    <div className="flex space-x-2">
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        className="hidden"
                                    />
                                    <FaStar
                                        className="cursor-pointer transition"
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        size={32}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Separation Line */}
                <hr className="border-gray-200 mb-6" />

                {/* Review Section */}
                <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">2. Write Your Review</h3>

                    {/* Nickname Input */}
                    <label className="block mb-2 text-sm font-medium text-gray-600">
                        Your Nickname (This will appear next to your review)
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        maxLength={maxNicknameChars}
                    />
                    <div className="text-right text-sm text-gray-500">Characters: {nickname.length}/{maxNicknameChars}</div>
                </div>

                {/* Review Title Input */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Your Review Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="A few words to sum up your experience"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        maxLength={maxTitleChars}
                    />
                    <div className="text-right text-sm text-gray-500">Characters: {reviewTitle.length}/{maxTitleChars}</div>
                </div>

                {/* Review Text Area */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Your Review</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Tell everyone the details about your experience"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        maxLength={maxReviewChars}
                    />
                    <div className="text-right text-sm text-gray-500">Characters: {reviewText.length}/{maxReviewChars}</div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button className="min-w-min px-8 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">
                        Submit Your Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;