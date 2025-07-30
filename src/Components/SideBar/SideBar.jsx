import React from 'react';
import clouds from '../../assets/clouds.png';
import logo from '../../assets/Logo.svg'
import left from '../../assets/Left.png'
import './SideBar.css';
import HomeLogo from '../../assets/Home.svg'
import MyBookings from '../../assets/Booking.svg'
import Explore from '../../assets/Explore.svg'
import Support from '../../assets/Support.svg'
import { Link, useNavigate } from 'react-router-dom';
import Details from '../../Pages/Detailspage/Details';
import { useLogged } from '../../Context/IsLogged';


export default function SideBar() {
    const { logged } = useLogged()
    const navigate = useNavigate()
    return (
        <aside className="absolute top-4 left-4 w-[80px] lg:w-[240px] h-[700px] bg-gradient-to-b from-[#0A69DA] via-[#0856C8] to-[#0231A5] p-2 lg:p-4 text-white rounded-lg shadow-lg z-10 transition-all duration-300">

            <div className="flex items-start justify-between">
                <div className="logo ">
                    <img src={logo} alt="Logo" className="h-auto hidden lg:block" />
                </div>
                <div>
                    <img src={left} alt="Left Icon" className="h-auto lg:hidden" />
                </div>
            </div>

            <ul className="space-y-4 font-medium mt-4">
                {[
                    ['Home', HomeLogo],
                    ['My Bookings', MyBookings],
                    ['Explore', Explore],
                    ['Support', Support],
                ].map(([label, icon]) => (
                    <li key={label}>

                        {
                            label === 'My Bookings' ? (
                                <Link to="/MyBookings" className="flex items-center space-x-2 hover:underline text-sm mb-9">
                                    <img src={icon} alt={label} className="w-6 h-6" />
                                    <span className="hidden lg:inline">{label}</span>
                                </Link>
                            ) : label === 'Home' ? (
                                <Link to="/" className="flex items-center space-x-2 hover:underline text-sm mb-9">
                                    <img src={icon} alt={label} className="w-6 h-6" />
                                    <span className="hidden lg:inline">{label}</span>
                                </Link>
                            ) : (
                                <a href="#" className="flex items-center space-x-2 hover:underline text-sm mb-9">
                                    <img src={icon} alt={label} className="w-6 h-6" />
                                    <span className="hidden lg:inline">{label}</span>
                                </a>
                            )
                        }
                    </li>
                ))}
            </ul>
            <div className="relative mt-60">

                <img
                    src={clouds}
                    alt="Cloud"
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-70 z-0 pointer-events-none"
                />
                {!logged && <button className="relative z-10 w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-100 text-sm hidden lg:block" onClick={() => navigate('/signup')}>
                    Sign UP Now
                </button>}
            </div>



        </aside>

    );
}