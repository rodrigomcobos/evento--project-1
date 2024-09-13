import React from 'react'
import { useState } from 'react';

const ProfileDetails = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            {/* Right Content */}
            <div className="min-w-[40dvw] p-10">
                <h1 className="text-3xl font-semibold mb-8">My Profile</h1>

                {/* My Info Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">My Info</h2>
                    <div className="grid grid-cols-2 gap-6 mb-4">
                        {/* Need to change database when user updates details, the placeholder will be the current user's info */}
                        <input type="text" className="border p-3 rounded-md text-md" placeholder="Rodrigo" />
                        <input type="text" className="border p-3 rounded-md text-md" placeholder="Cobos" />
                    </div>
                    <button className="px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">Update Details</button>
                </div>

                <hr className="my-8" />

                {/* Email Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Email Address</h2>
                    {/* Need to change database when user updates details, the placeholder will be the current user's info */}
                    <input type="email" className="border p-3 w-full rounded-md text-md" placeholder="test@testemail.com"></input>
                    <button className="mt-4 px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">Update Email</button>
                </div>

                <hr className="my-8" />

                {/* Password Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Update Password</h2>
                    <div className="relative">
                        {/* Need to change database when user updates details, the placeholder will be the current user's info */}
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="border p-3 w-full rounded-md text-md"
                            placeholder="New Password"
                        />
                        <button
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-3 text-md text-blue-600"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <p className="text-md mt-2">Your password must include at least:</p>
                    <ul className="mt-1 list-disc pl-5 text-[.60rem] text-gray-400">
                        <li>8 characters</li>
                        <li>Must contain letters</li>
                        <li>Must contain numbers</li>
                    </ul>
                    <button className="mt-4 px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">Update Password</button>
                </div>

                <hr className="my-8" />

                {/* Phone Number Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Phone Number</h2>
                    {/* Need to change database when user updates details */}
                    <input type="tel" className="border p-3 w-full rounded-md text-md" placeholder="***-***-6829" />
                    <button className="mt-4 px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">Update Number</button>
                </div>
            </div>
            {/* Right Content Ends Here */}
        </div>
    )
}

export default ProfileDetails