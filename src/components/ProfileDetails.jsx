import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/userSlice';

const ProfileDetails = () => {
    const dispatch = useDispatch();
    const { currentUser, loading, error } = useSelector((state) => state.user);

    // States for form validation
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState('');
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);

    // Update user details on mount or when currentUser changes
    useEffect(() => {
        if (currentUser) {
            setFirstName(currentUser.first_name || '');
            setLastName(currentUser.last_name || '');
            setUsername(currentUser.username || '');
            setEmail(currentUser.email || '');
            setPhone(currentUser.phone || '');
        }
    }, [currentUser]);

    // Toggle password visibility function for password input
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Validate password function for password input field
    const validatePassword = (value) => {
        setPassword(value);
        const hasLetter = /[A-Za-z]/.test(value);
        const digitMatches = value.match(/\d/g);
        const digitCount = digitMatches ? digitMatches.length : 0;

        // Validate password strength and set strength state based on the result so that it can be displayed
        if (value.length >= 8 && hasLetter && digitCount >= 2) {
            setIsInvalidPassword(false);
            if (digitCount > 4) {
                setStrength('Strong');
            } else if (digitCount >= 2) {
                setStrength('Medium');
            }
        } else {
            setIsInvalidPassword(true);
            setStrength('Weak');
        }
    };

    // Update user details function for each field
    const handleUpdateDetails = async () => {
        try {
            const result = await dispatch(updateUserProfile({ first_name: firstName, last_name: lastName })).unwrap();
            // console.log('Update result:', result);
        } catch (error) {
            console.error('Failed to update details:', error);
            console.error('Error details:', error.response?.data);
        }
    };

    // Update user username function for each field
    const handleUpdateUsername = async () => {
        try {
            await dispatch(updateUserProfile({ username })).unwrap();
            // console.log('Username updated successfully');
        } catch (error) {
            console.error('Failed to update username:', error);
        }
    };

    // Update user email function for each field
    const handleUpdateEmail = async () => {
        try {
            await dispatch(updateUserProfile({ email })).unwrap();
            // console.log('Email updated successfully');
        } catch (error) {
            console.error('Failed to update email:', error);
        }
    };

    // Update user password function for each field
    const handlePasswordUpdate = async () => {
        if (!isInvalidPassword) {
            try {
                await dispatch(updateUserProfile({ password })).unwrap();
                // console.log('Password updated successfully');
                setPassword('');
                setStrength('');
            } catch (error) {
                console.error('Failed to update password:', error);
            }
        } else {
            // console.log('Password does not meet the criteria');
        }
    };

    // Update user phone number function for each field
    const handleUpdateNumber = async () => {
        try {
            await dispatch(updateUserProfile({ phone })).unwrap();
            // console.log('Phone number updated successfully');
        } catch (error) {
            console.error('Failed to update phone number:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="min-w-[50dvw] p-10">
                <h1 className="text-3xl font-semibold mb-8">Profile Details</h1>

                {/* My Info Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">My Info</h2>
                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <input
                            type="text"
                            className="border p-3 rounded-md text-md"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border p-3 rounded-md text-md"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleUpdateDetails}
                        className="px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Update Details
                    </button>
                </section>

                <hr className="my-8" />

                {/* Username Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Username</h2>
                    <input
                        type="text"
                        className="border p-3 w-full rounded-md text-md"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        onClick={handleUpdateUsername}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Update Username
                    </button>
                </section>

                <hr className="my-8" />

                {/* Email Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Email Address</h2>
                    <input
                        type="email"
                        className="border p-3 w-full rounded-md text-md"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <input
                        type="tel"
                        className="border p-3 w-full rounded-md text-md"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
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