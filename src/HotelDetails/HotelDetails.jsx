import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import SideBar from '../Components/SideBar/SideBar';
import { Interceptor } from '../Interceptor/Interceptor';
import { Carousel } from 'flowbite-react';
import RecommendedHotels from '../Components/Recommended/RecommendedHotels';

export default function HotelDetails() {
    const { id } = useParams();
    const [singleHotel, setSingleHotel] = useState(null); // initially null to check loading
    const navigate = useNavigate();
    const handleNavigate = (id) => {
        navigate(`/BookingDetails/${id}`);
    }



    useEffect(() => {
        Interceptor.get(`/hotels/${id}`)
            .then((res) => {
                setSingleHotel(res?.data);
                console.log(res?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (!singleHotel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading hotel details...</p>
            </div>
        );
    }

    const priceInfo = singleHotel.pricing?.[0];



    return (
        <div className="relative min-h-screen">
            <Navbar />
            <SideBar />
            <div className="max-w-6xl mx-auto w-full px-4 pl-24 pt-7">
                <h2 className="text-xl font-bold mb-4">Hotel Details</h2>

                <div className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                         <Carousel className="h-64 rounded-lg">
              {[singleHotel.images?.main, ...(singleHotel.images?.gallery || [])].map((src, i) => (
                <img key={i} src={src} alt={`hotel-${i}`} className="object-cover h-full w-full" />
              ))}
            </Carousel>
                    </div>


                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold">{singleHotel.name}</h3>
                            <p className="text-gray-600 mt-1">
                                {singleHotel.address?.street}, {singleHotel.address?.city}, {singleHotel.address?.state}, {singleHotel.address?.country}
                            </p>
                            <p className="text-sm mt-2 text-gray-700">{singleHotel.description}</p>


                            <div className="mt-3">
                                <span className="text-yellow-500 font-bold text-lg">{singleHotel.rating?.score}</span>
                                <span className="text-sm text-gray-500 ml-1">({singleHotel.rating?.reviewCount} reviews)</span>
                            </div>

                            {priceInfo && (
                                <div className="mt-4 text-lg">
                                    <span className="text-red-600 font-bold">{priceInfo.discountedPrice} USD</span>
                                    <span className="text-sm text-gray-500 font-medium ml-2 line-through">{priceInfo.originalPrice} USD</span>
                                    <span className="text-sm text-green-600 font-bold ml-2">{priceInfo.discount}</span>
                                    <span className="text-sm text-gray-500 ml-1">/ {priceInfo.priceUnit}</span>
                                </div>
                            )}

                            {/* Amenities */}
                            <div className="mt-3 text-sm text-gray-700 space-x-3">
                                {singleHotel.amenities?.includes('Parking') && <span>🚗 Parking</span>}
                                {singleHotel.amenities?.includes('Attached Bathroom') && <span>🛁 Bathroom</span>}
                                {singleHotel.amenities?.includes('CCTV Cameras') && <span>📷 CCTV</span>}
                                {singleHotel.amenities?.includes('Wifi') && <span>📶 Wifi</span>}
                            </div>
                        </div>


                        <div className="mt-4">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                                onClick={() => handleNavigate(singleHotel.id)}
                            >
                                PAY NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <RecommendedHotels />
        </div>
    );
}
