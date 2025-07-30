import React, { use, useEffect, useState } from 'react'
import { Interceptor } from '../../Interceptor/Interceptor'
import './RecommendedHotels.css'
import { useNavigate } from 'react-router-dom';


export default function RecommendedHotels() {
    const [recommendedHotels, setRecommendedHotels] = useState([])
    const [viewAll, setViewAll] = useState(false);
    const navigate= useNavigate();
const handleNavigate= (id) => {
        navigate(`/HotelDetails/${id}`);
    }



    useEffect(() => {
        Interceptor.get('/recommended_hotels')
            .then((res) => {
                setRecommendedHotels(res?.data);
                // ?.data?.products
                // setLoading(false);
                console.log(recommendedHotels);
            })
            .catch((err) => {
                console.log(err);
                // setLoading(false);
            });
    }, []);
    useEffect(() => {
        console.log(recommendedHotels);
    }, [recommendedHotels]);


    return (
        <section className='max-w-6xl mx-auto w-full px-4 mt-10 pl-24 pt-7'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-semibold'>Recommended Hotels</h2>
                <button
                    className='hover:underline cursor-pointer'
                    onClick={() => setViewAll(!viewAll)}
                >
                    {viewAll ? 'Collapse' : 'View all'}
                </button>
            </div>

            {!viewAll ? (
                // 🎯 Carousel mode
                <div className='flex  overflow-x-auto pb-2 no-scrollbar gap-4'>
                    {recommendedHotels.map((hotel) => (
                        <div key={hotel.id} className="min-w-[300px] max-w-[350px] bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0">
                            <img src={hotel.images.main} alt={hotel.name} className="h-40 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                                <p className="text-sm text-gray-600">{hotel.address.city}, {hotel.address.state}</p>
                                <p className="text-sm mt-1 truncate line-clamp-2">{hotel.description}</p>
                                <div className="mt-2">
                                    <span className="text-yellow-500 font-semibold">{hotel.rating.score}</span>
                                    <span className="text-sm text-gray-500 ml-1">({hotel.rating.reviewCount} reviews)</span>
                                </div>
                                <div className="mt-2 flex justify-between items-center">
                                    <div>
                                        <span className="font-bold"><span className='font-light'>Start with:</span> ${hotel.pricing[0].originalPrice}</span>
                                        <span className="text-sm text-gray-500"> / {hotel.pricing[0].priceUnit}</span>
                                    </div>
                                    <div>
                                        <button className='text-red-600 text-[12px] font-semibold p-2 hover: cursor:pointer  hover:bg-red-200 bg-red-50 rounded-lg' onClick={()=>handleNavigate(hotel.id)}>Book now</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // 📦 Grid mode
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 '>
                    {recommendedHotels.map((hotel) => (
                        <div key={hotel.id} className="bg-white shadow-md rounded-lg overflow-hidden  ">
                            <img src={hotel.images.main} alt={hotel.name} className="h-40 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                                <p className="text-sm text-gray-600">{hotel.address.city}, {hotel.address.state}</p>
                                <p className="text-sm mt-1 line-clamp-2">{hotel.description}</p>
                                <div className="mt-2">
                                    <span className="text-yellow-500 font-semibold">{hotel.rating.score}</span>
                                    <span className="text-sm text-gray-500 ml-1">({hotel.rating.reviewCount} reviews)</span>
                                </div>
                                <div className="mt-2 flex justify-between items-center">
                                    <div>
                                       <span className="font-bold"><span className='font-light'>Start with:</span> ${hotel.pricing[0].originalPrice}</span>
                                        <span className="text-sm text-gray-500"> / {hotel.pricing[0].priceUnit}</span>
                                    </div>
                                    <div>
                                           <button className='text-red-600 text-[12px] font-semibold p-2 hover: cursor:pointer  hover:bg-red-200 bg-red-50 rounded-lg' onClick={()=>handleNavigate(hotel.id)}>Book now</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>

    )
}
