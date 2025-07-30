import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const countries = [
  { label: "Egypt", value: "EG" },
  { label: "Morocco", value: "MA" },
  { label: "United States", value: "US" },
  { label: "Greece", value: "GR" },
];

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  // Initialize form fields from URL if present
  const [destination, setDestination] = useState(searchParams.get('q') || '');
  const [country, setCountry] = useState(searchParams.get('address.countryIsoCode') || '');
  const [date, setDate] = useState(searchParams.get('date') || '');

  // ✅ Trigger search on click
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destination) params.set('q', destination);
    if (country) params.set('address.countryIsoCode', country);
    if (date) params.set('date', date);

    navigate(`/Details?${params.toString()}`);
  };

  // ✅ Clear filters and navigate to /Details (no params)
  const handleClearFilters = () => {
    setDestination('');
    setCountry('');
    setDate('');
    navigate('/Details');
  };

  return (
    <div className="absolute left-1/2 top-[260px] transform -translate-x-1/2 z-20 w-full max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full flex gap-4 items-center flex-wrap">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Where to?"
          className="flex-1 px-2 py-2 border border-gray-300 rounded bg-gray-100"
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-lg p-3"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border bg-gray-100 border-gray-300 rounded"
        />

        {/* ✅ Clear Filters Button */}
        <button
          className="hover:underline cursor-pointer text-sm text-blue-600"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>

        {/* ✅ Search Button */}
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
