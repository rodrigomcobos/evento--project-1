// SearchBar.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className="flex ring-2 ring-blue-500 items-center bg-gray-100 rounded-3xl px-4 py-3 w-[50rem] mx-auto shadow-md">
            <FaSearch className="text-gray-500 mr-3" />
            <input
                type="text"
                className="bg-transparent outline-none w-full text-sm"
                placeholder={isFocused ? '' : 'Search events, artists, teams, and more'}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default SearchBar;