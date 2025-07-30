import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Interceptor } from '../../Interceptor/Interceptor'; // ✅ using your clean Interceptor
import Navbar from '../../Components/Navbar/Navbar';
import SideBar from '../../Components/SideBar/SideBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import NotFound from '../../assets/No Results Found.png'

export default function Details() {
    const location = useLocation();
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q');
        const country = searchParams.get('address.countryIsoCode');

        let api = '/hotels';
        const query = [];

        if (q) query.push(`q=${q}`);
        if (country) query.push(`address.countryIsoCode=${country}`);

        if (query.length > 0) {
            api += '?' + query.join('&');
        }

        Interceptor.get(api)
            .then((res) => {
                const data = res?.data;
                if (Array.isArray(data)) {
                    setHotels(data);
                    console.log(data);
                }
            })
            .catch((err) => {
                console.error('❌ API error:', err);
                setHotels([]);
            });
    }, [location.search]);


    if (!hotels) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading hotel details...</p>
            </div>
        );
    }

    const priceInfo = hotels?.pricing?.[0];
    const handleNavigate = (id) => {
        navigate(`/HotelDetails/${id}`);
    }

    return (
        <div className="relative min-h-screen">
            <Navbar />
            <SideBar />
            <SearchBar />

            <div className='max-w-6xl mx-auto w-full px-4 mt-10 pl-24 pt-7'>
                <h2 className="text-xl font-bold mb-4">Hotels</h2>
                {hotels.length === 0 ? (
                    <div className='flex flex-col items-center justify-center mt-7 '>
                        <img src={NotFound} alt="NotFound" className='w-[400px]' />
                        <p className='mt-4 font-bold'>No hotels found.</p>
                    </div>

                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {hotels.map((hotel) => (
                            <li key={hotel.id} className="bg-white rounded-lg shadow p-4">
                                <img src={hotel.images.main} alt={hotel.name} className="h-40 w-full object-cover mb-2" />
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                                    <span className="text-yellow-500 font-semibold"> {hotel.rating.score}⭐</span>
                                </div>

                                <p className="text-sm text-gray-600">
                                    {hotel.address.city}, {hotel.address.state}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Near {hotel.address.street}
                                </p>

                                <div className="flex gap-4 items-center text-sm text-gray-600 mt-2">
                                    {hotel.amenities?.includes('Parking') && <span>🚗 Parking</span>}
                                    {hotel.amenities?.includes('Attached Bathroom') && <span>🛁 Bathroom</span>}
                                    {hotel.amenities?.includes('CCTV Cameras') && <span>📷 CCTV</span>}
                                    {hotel.amenities?.includes('Wifi') && <span>📶 Wifi</span>}
                                </div>

                                {priceInfo && (
                                    <div className="mt-4 text-lg">
                                        <span className="text-red-600 font-bold">{priceInfo.discountedPrice} USD</span>
                                        <span className="text-sm text-gray-500 font-medium ml-2 line-through">{priceInfo.originalPrice} USD</span>
                                        <span className="text-sm text-green-600 font-bold ml-2">{priceInfo.discount}</span>
                                        <span className="text-sm text-gray-500 ml-1">/ {priceInfo.priceUnit}</span>
                                    </div>
                                )}

                                <div>
                                    <button className='text-red-600 text-[12px] font-semibold p-2 hover: cursor:pointer  hover:bg-red-200 bg-red-50 rounded-lg' onClick={() => handleNavigate(hotel.id)}>Book now</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}


// address
// :
// {street: '780 Mission Street', city: 'San Francisco', state: 'CA', country: 'United States', countryIsoCode: 'US'}
// amenities
// :
// (4) ['Parking', 'Attached Bathroom', 'CCTV Cameras', 'Wifi']
// description
// :
// "Whether you are in town for business or leisure, San Francisco welcomes travelers to Northern California with exceptional service."
// id
// :
// "marriott_marquis_sf"
// images
// :
// {main: 'https://cache.marriott.com/content/dam/marriott-re…erpolation=progressive-bilinear&downsize=1920px:*', gallery: Array(3)}
// name
// :
// "San Francisco Marriott Marquis"
// pricing
// :
// (3) [{…}, {…}, {…}]
// rating
// :
// {score: 4.9, maxScore: 5, reviewCount: 276, status: 'Excellent'}