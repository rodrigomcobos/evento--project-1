import React, { useState } from 'react';

// react-datepicker setup
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchFilter = ({ setCategory, setDate, setPrice, clearFilters }) => {
    const [showMoreCategories, setShowMoreCategories] = useState(false);
    const [showMoreDates, setShowMoreDates] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showPrice, setShowPrice] = useState(false);

    // Filter options by category
    const categories = [
        'Business', 'Food & Drink', 'Health', 'Music', 'Charity & Causes',
        'Community', 'Family & Education', 'Fashion', 'Film & Media', 'Hobbies',
        'Home & Lifestyle', 'Performing & Visual Arts', 'Government', 'Spirituality',
        'School Activities', 'Science & Tech', 'Holidays', 'Sports', 'Travel & Outdoor', 'Other'
    ];

    // Filter options by date
    const dates = [
        'Today', 'Tomorrow', 'This weekend', 'This week',
        'Next week', 'This month', 'Next month', 'Pick a date'
    ];

    // Handle filter options by category
    const handleCategoryClick = (category) => {
        setCategory(category);
    };

    // Handle filter options by date
    const handleDateClick = (date) => {
        setDate(date);
        setSelectedFilter(date);
    };

    // Handle filter options by price
    const handlePriceClick = (price) => {
        setPrice(price);
    };

    // Using react-datepicker to select date
    const handleDatePickerChange = (date) => {
        setSelectedDate(date);
        setDate(date.toISOString());
    };

    return (
        <>
            {/* Mobile Filter Buttons */}
            <div className="lg:hidden flex overflow-x-auto space-x-2 mb-4">
                <button
                    className="border-2 text-indigo-500 border-indigo-500 hover:bg-gradient-to-r from-indigo-500 to-cyan-500 hover:text-white transition duration-300 p-2 px-8 rounded-full"
                    onClick={() => setShowFilters(!showFilters)}>
                    Filters
                </button>
                <button
                    className="border-2 text-indigo-500 border-indigo-500 hover:bg-gradient-to-r from-indigo-500 to-cyan-500 hover:text-white transition duration-300 p-2 px-8 rounded-full"
                    onClick={() => setShowCategory(!showCategory)}>
                    Category
                </button>
                <button
                    className="border-2 text-indigo-500 border-indigo-500 hover:bg-gradient-to-r from-indigo-500 to-cyan-500 hover:text-white transition duration-300 p-2 px-8 rounded-full"
                    onClick={() => setShowDate(!showDate)}>
                    Date
                </button>
                <button
                    className="border-2 text-indigo-500 border-indigo-500 hover:bg-gradient-to-r from-indigo-500 to-cyan-500 hover:text-white transition duration-300 p-2 px-8 rounded-full"
                    onClick={() => setShowPrice(!showPrice)}>
                    Price
                </button>
            </div>

            {/* Mobile Dropdowns */}
            {showFilters && (
                <div className="lg:hidden mb-4 p-4 border rounded bg-white shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button
                            onClick={clearFilters}
                            className="text-sm text-indigo-500 hover:text-indigo-700 underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                    <div className="mt-2">
                        {/* Category Filter */}
                        <h3 className="text-lg font-semibold">Category</h3>
                        <ul className="mt-2">
                            {categories.slice(0, showMoreCategories ? categories.length : 4).map((category, index) => (
                                <li key={index} className="text-gray-700 py-1">
                                    <button onClick={() => handleCategoryClick(category)} className="text-indigo-500 hover:text-indigo-800">
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowMoreCategories(!showMoreCategories)}
                            className="text-indigo-500 text-sm mt-2">
                            {showMoreCategories ? 'View less' : 'View more'}
                        </button>

                        {/* Date Filter */}
                        <h3 className="text-lg font-semibold mt-4">Date</h3>
                        <ul className="mt-2">
                            {dates.slice(0, showMoreDates ? dates.length : 4).map((date, index) => (
                                <li key={index} className="text-gray-700 py-1">
                                    <input
                                        type="radio"
                                        id={date}
                                        name="date"
                                        className="mr-2"
                                        onChange={() => handleDateClick(date)}
                                    />
                                    <label htmlFor={date}>{date}</label>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowMoreDates(!showMoreDates)}
                            className="text-indigo-500 text-sm mt-2">
                            {showMoreDates ? 'View less' : 'View more'}
                        </button>

                        {/* Show the calendar dropdown only when 'Pick a date' is selected */}
                        {selectedFilter === 'Pick a date' && (
                            <div className="mt-4">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDatePickerChange}
                                    placeholderText="Select a date"
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </div>
                        )}

                        {/* Price Filter */}
                        <h3 className="text-lg font-semibold mt-4">Price</h3>
                        <ul className="mt-2">
                            <li className="text-gray-700 py-1">
                                <input type="radio" id="free" name="price" className="mr-2" onChange={() => handlePriceClick('Free')} />
                                <label htmlFor="free">Free</label>
                            </li>
                            <li className="text-gray-700 py-1">
                                <input type="radio" id="paid" name="price" className="mr-2" onChange={() => handlePriceClick('Paid')} />
                                <label htmlFor="paid">Paid</label>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Category Dropdown */}
            {showCategory && (
                <div className="lg:hidden mb-4 p-4 border rounded bg-white shadow-md">
                    <h3 className="text-lg font-semibold">Category</h3>
                    <ul className="mt-2">
                        {categories.slice(0, showMoreCategories ? categories.length : 4).map((category, index) => (
                            <li key={index} className="text-gray-700 py-1">
                                <button onClick={() => handleCategoryClick(category)} className="text-indigo-500 hover:text-indigo-800">
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Date Dropdown */}
            {showDate && (
                <div className="lg:hidden mb-4 p-4 border rounded bg-white shadow-md">
                    <h3 className="text-lg font-semibold">Date</h3>
                    <ul className="mt-2">
                        {dates.map((date, index) => (
                            <li key={index} className="text-gray-700 py-1">
                                <input
                                    type="radio"
                                    id={date}
                                    name="date"
                                    className="mr-2"
                                    onChange={() => handleDateClick(date)}
                                />
                                <label htmlFor={date}>{date}</label>
                            </li>
                        ))}
                    </ul>

                    {/* Show the calendar dropdown only when 'Pick a date' is selected */}
                    {selectedFilter === 'Pick a date' && (
                        <div className="mt-4">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDatePickerChange}
                                placeholderText="Select a date"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Price Dropdown */}
            {showPrice && (
                <div className="lg:hidden mb-4 p-4 border rounded bg-white shadow-md">
                    <h3 className="text-lg font-semibold">Price</h3>
                    <ul className="mt-2">
                        <li className="text-gray-700 py-1">
                            <input type="radio" id="free" name="price" className="mr-2" onChange={() => handlePriceClick('Free')} />
                            <label htmlFor="free">Free</label>
                        </li>
                        <li className="text-gray-700 py-1">
                            <input type="radio" id="paid" name="price" className="mr-2" onChange={() => handlePriceClick('Paid')} />
                            <label htmlFor="paid">Paid</label>
                        </li>
                    </ul>
                </div>
            )}

            {/* Desktop Filters */}
            <section className="hidden lg:block w-full lg:w-1/4 p-4 border-r-2 border-gray-100 mb-14">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Filters</h2>
                    <button
                        onClick={clearFilters}
                        className="text-sm text-indigo-500 hover:text-indigo-700 underline"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Category</h3>
                    <ul className="mt-2">
                        {categories.slice(0, showMoreCategories ? categories.length : 4).map((category, index) => (
                            <li key={index} className="text-gray-700 py-1">
                                <button onClick={() => handleCategoryClick(category)} className="text-indigo-500 hover:text-indigo-800">
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowMoreCategories(!showMoreCategories)}
                        className="text-indigo-500 text-sm mt-2">
                        {showMoreCategories ? 'View less' : 'View more'}
                    </button>
                </div>

                {/* Date Filter */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Date</h3>
                    <ul className="mt-2">
                        {dates.slice(0, showMoreDates ? dates.length : 4).map((date, index) => (
                            <li key={index} className="text-gray-700 py-1">
                                <input
                                    type="radio"
                                    id={date}
                                    name="date"
                                    className="mr-2"
                                    onChange={() => handleDateClick(date)}
                                />
                                <label htmlFor={date}>{date}</label>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowMoreDates(!showMoreDates)}
                        className="text-indigo-500 text-sm mt-2">
                        {showMoreDates ? 'View less' : 'View more'}
                    </button>
                </div>

                {/* Show the calendar dropdown only when 'Pick a date' is selected */}
                {selectedFilter === 'Pick a date' && (
                    <div className="mt-4">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDatePickerChange}
                            placeholderText="Select a date"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </div>
                )}

                {/* Price Filter */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Price</h3>
                    <ul className="mt-2">
                        <li className="text-gray-700 py-1">
                            <input type="radio" id="free" name="price" className="mr-2" onChange={() => handlePriceClick('Free')} />
                            <label htmlFor="free">Free</label>
                        </li>
                        <li className="text-gray-700 py-1">
                            <input type="radio" id="paid" name="price" className="mr-2" onChange={() => handlePriceClick('Paid')} />
                            <label htmlFor="paid">Paid</label>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default SearchFilter;