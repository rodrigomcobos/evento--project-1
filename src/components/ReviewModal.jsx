import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewModal = () => {
    const [nickname, setNickname] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const maxNicknameChars = 40;
    const maxTitleChars = 60;
    const maxReviewChars = 5000;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                {/* Modal Header */}
                <h2 className="text-xl font-semibold mb-4">Write Your Review</h2>

                {/* Rating Section */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">1. Select Your Rating</h3>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className="text-gray-300 text-2xl cursor-pointer hover:text-yellow-400 transition" />
                        ))}
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
                    <div className="text-right text-sm text-gray-500">Characters max: {maxNicknameChars}</div>
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
                    <div className="text-right text-sm text-gray-500">Characters max: {maxTitleChars}</div>
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
                    <div className="text-right text-sm text-gray-500">Characters max: {maxReviewChars}</div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button className="min-w-min px-8 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">
                        Sign in to Submit Your Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;