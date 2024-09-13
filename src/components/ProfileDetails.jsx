import React, { useState } from 'react';

const ProfileDetails = () => {
    //UseStates for password validation, strength, and password input
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState('');
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);

    // Function to toggle password visibility when clicking on show
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to validate password criteria
    const validatePassword = (value) => {
        setPassword(value);
        const hasLetter = /[A-Za-z]/.test(value);
        const digitMatches = value.match(/\d/g);
        const digitCount = digitMatches ? digitMatches.length : 0;

        // Check if the password meets the criteria by showing the password strength
        if (value.length >= 8 && hasLetter && digitCount >= 2) {
            setIsInvalidPassword(false); // Password is valid
            if (digitCount > 4) {
                setStrength('Strong');
            } else if (digitCount >= 2) {
                setStrength('Medium');
            }
        } else {
            setIsInvalidPassword(true); // Password does not meet criteria
            setStrength('Weak');
        }
    };

    // Function that updates the password in the database, for now it console logs
    const handlePasswordUpdate = () => {
        if (!isInvalidPassword) {
            console.log('Password updated:', password);
        } else {
            console.log('Password does not meet the criteria');
        }
    };

    // Function that updates the user details in the database, for now it console logs
    const handleUpdateDetails = () => {
        console.log('Details updated: First Name and Last Name');
        // Add logic to update user details here
    };

    // Function that updates the user email in the database, for now it console logs
    const handleUpdateEmail = () => {
        console.log('Email updated');
        // Add logic to update email in the database here
    };

    // Function that updates the user phone number in the database, for now it console logs
    const handleUpdateNumber = () => {
        console.log('Phone number updated');
        // Add logic to update phone number in the database here
    };

    return (
        <>
            {/* Right Content */}
            <div className="min-w-[55dvw] p-10">
                <h1 className="text-3xl font-semibold mb-8">My Profile</h1>

                {/* My Info Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">My Info</h2>
                    <div className="grid grid-cols-2 gap-6 mb-4">
                        {/* Need to change database when user updates details */}
                        <input type="text" className="border p-3 rounded-md text-md" placeholder="Rodrigo" />
                        <input type="text" className="border p-3 rounded-md text-md" placeholder="Cobos" />
                    </div>
                    <button
                        onClick={handleUpdateDetails}
                        className="px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Update Details
                    </button>
                </section>

                <hr className="my-8" />

                {/* Email Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Email Address</h2>
                    <input
                        type="email"
                        className="border p-3 w-full rounded-md text-md"
                        placeholder="test@testemail.com"
                    />
                    <button
                        onClick={handleUpdateEmail}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Update Email
                    </button>
                </section>

                <hr className="my-8" />

                {/* Password Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Update Password</h2>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            //  If password is invalid, show red border
                            className={`border p-3 w-full rounded-md text-md ${isInvalidPassword ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                        />
                        <button
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-3 text-md text-gray-400"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <p className="mt-2 ml-1 text-sm text-gray-400">
                        A password must be at least 8 characters.<br />
                        It has to have at least one letter and two digits.
                    </p>

                    {/* Password Strength Indicator */}
                    {password && (
                        <p className="mt-2 ml-1 text-sm text-gray-500">
                            Password Strength: <span className={`font-semibold ${strength === 'Strong' ? 'text-green-500' : strength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                                {strength || 'Too Weak'}
                            </span>
                        </p>
                    )}

                    <button
                        onClick={handlePasswordUpdate}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Update Password
                    </button>
                </section>

                <hr className="my-8" />

                {/* Phone Number Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Phone Number</h2>
                    <input type="tel" className="border p-3 w-full rounded-md text-md" placeholder="***-***-****" />
                    <button
                        onClick={handleUpdateNumber}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Update Number
                    </button>
                </section>
            </div>
        </>
    );
};

export default ProfileDetails;