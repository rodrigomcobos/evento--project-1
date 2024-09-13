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
        <div className='px-4 my-12'>
            <div className="flex bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-600 items-center bg-gray-100 rounded-full gap-4 p-[2px] w-auto max-w-4xl mx-auto shadow-md">
                <div className='rounded-full p-3 bg-white h-full w-full flex items-center justify-between'>
                    <FaSearch className="text-gray-500 mr-3" />
                    <input
                        type="text"
                        className="bg-transparent outline-none w-full text-md"
                        placeholder={isFocused ? '' : 'Search events, artists, teams, and more'}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Styled button reference */}
                {/* <div>
                <button className='flex items-center justify-center h-10 w-32 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-600 text-white p-[1.5px]'>
                    <div className='rounded-full bg-gray-900 h-full w-full flex items-center justify-center'>
                        Click me
                    </div>
                </button>
            </div> */}
            </div>
        </div>
    );
};

export default SearchBar;