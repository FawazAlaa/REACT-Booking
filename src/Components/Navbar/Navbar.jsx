import React, { useState } from 'react';
import mainImage from '../../assets/Main.jpg';
import HotelIcon from '../../assets/Hotel.svg';
import VillaIcon from '../../assets/Villa.svg';
import TaxiIcon from '../../assets/Texi.svg';
import FlightsIcon from '../../assets/Flights.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useLogged } from '../../Context/IsLogged';

export default function Navbar() {
  const { user, setUser, setLogged } = useLogged();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    setLogged(false);
    navigate('/');
  };

  return (
    <header
      className="relative h-[300px] bg-cover bg-center"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      {/* Top right login/signup or user dropdown */}
      <nav className="absolute top-0 right-0 p-4 text-white space-x-4">
        {user ? (
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:underline font-medium"
            >
              Hello, {user.name} ⌄
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-10">
                <Link
                  to="/my-bookings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign up</Link>
          </>
        )}
      </nav>

      {/* Centered icons */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex gap-10">
        {[['HOTEL', HotelIcon], ['VILLA', VillaIcon], ['TAXI', TaxiIcon], ['FLIGHTS', FlightsIcon]].map(([label, icon]) => (
          <div key={label} className="flex flex-col items-center text-sm">
            {label === 'HOTEL' ? (
              <Link to="/Details" className="flex flex-col items-center">
                <img src={icon} alt={label} className="w-6 h-6 mb-1" />
                <span className="hover:underline">{label}</span>
              </Link>
            ) : (
              <a href="#" className="flex flex-col items-center">
                <img src={icon} alt={label} className="w-6 h-6 mb-1" />
                <span className="hover:underline">{label}</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </header>
  );
} 

