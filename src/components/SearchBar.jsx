import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { performSearch } from '../redux/searchSlice';

// react-icons
import { FaSearch } from 'react-icons/fa';


const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle search input change and search based on the search input
    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            try {
                setError(null);
                await dispatch(performSearch(searchQuery)).unwrap();
                navigate(`/search-results`);
            } catch (err) {
                console.error('Search failed:', err);
                setError('Search failed. Please try again.');
            }
        }
    };

    return (
        <section className='px-4 mt-8 mb-14'>
            <form onSubmit={handleSearch}>
                <div className="flex bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-600 items-center bg-gray-100 rounded-full gap-4 p-[2px] w-auto max-w-4xl mx-auto shadow-md">
                    <div className='rounded-full p-3 bg-white h-full w-full flex items-center justify-between'>
                        <FaSearch className="text-gray-500 mr-3 ml-1" />
                        <input
                            type="text"
                            className="bg-transparent outline-none w-full text-md"
                            placeholder={isFocused ? '' : 'Search events, artists, teams, and more'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                </div>
            </form>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </section>
    );
};

export default SearchBar;