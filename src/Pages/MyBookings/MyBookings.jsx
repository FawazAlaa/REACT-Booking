import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeBooking } from '../../Store/HotelSlicer';
import Navbar from '../../Components/Navbar/Navbar';
import SideBar from '../../Components/SideBar/SideBar';

export default function MyBookings() {
    const dispatch = useDispatch();
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        setUser(loggedUser);
        setBookings(loggedUser?.hotelsbooked || []);
    }, []);

    const handleRemove = (id) => {
        dispatch(removeBooking(id));

        setBookings(prev => prev.filter(b => b.hotelId !== id));
    };

    return (
        <div className="relative min-h-screen bg-gray-50">
            <Navbar />
            <SideBar />

            <div className="flex justify-between align px-10 py-12">

                <div className="w-[60%] ml-60">
                    <h2 className="text-xl font-bold mb-6">My Bookings</h2>
                    {bookings.length === 0 ? (
                        <p>No bookings found.</p>
                    ) : (
                        bookings.map((hotel) => (
                            <div
                                key={hotel.id}
                                className="bg-white rounded shadow p-4 flex gap-4 items-start mb-6"
                            >
                                <img
                                    src={hotel.hotelImage}
                                    alt={hotel.hotelName}
                                    className="w-48 h-36 object-cover rounded"
                                />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold">{hotel.hotelName}</h3>
                                                 <p className="text-sm text-gray-500 mb-2">{hotel.address?.street}</p>
                                            <div className="flex gap-4 items-center text-sm text-gray-600 mt-2">
                                                {hotel.amenities?.includes('Parking') && <span>🚗 Parking</span>}
                                                {hotel.amenities?.includes('Attached Bathroom') && <span>🛁 Bathroom</span>}
                                                {hotel.amenities?.includes('CCTV Cameras') && <span>📷 CCTV</span>}
                                                {hotel.amenities?.includes('Wifi') && <span>📶 Wifi</span>}
                                            </div>
                                            <div className="text-red-500 font-semibold text-md">
                                                {hotel.totalPrice / hotel.nights}$ <span className="text-yellow-600 text-sm font-bold ml-2">{/* e.g. 25% off */}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">4.9 ★</span>
                                            <button
                                                onClick={() => handleRemove(hotel.hotelId)}
                                                className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-600">
                                        <span className="mr-4">
                                            <strong>From:</strong> {hotel.checkIn}
                                        </span>
                                        <span>
                                            <strong>To:</strong> {hotel.checkOut}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="w-[20%] h-[200px] bg-white rounded shadow p-6  mt-7 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">
                        {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-gray-500 text-sm">Personal Account</p>
                    <button className="mt-4 bg-gray-200 text-sm px-4 py-1 rounded hover:bg-gray-300">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
