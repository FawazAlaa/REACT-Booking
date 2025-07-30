import React, { useEffect, useState } from 'react'
import { Interceptor } from '../../Interceptor/Interceptor'
import { Link } from 'react-router-dom'

export default function BestOffer() {
    const [bestOfferList, setBestOfferList] = useState([])

    useEffect(() => {
        Interceptor.get('/best_offer')
            .then((res) => {
                setBestOfferList(res?.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    useEffect(() => {
        console.log(bestOfferList);
    }, [bestOfferList])

    return (
        <div className=' bg-white shadow-md rounded-lg'>
            <h2 className='font-bold'>Best Offer</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {bestOfferList.map((offer) => (
                    <div key={offer.id} className="p-4">
                        <div className='rounded-t-4xl'>
                            <Link to={`/HotelDetails/${offer.id}`}><img src={offer.image} alt={offer.name} className="w-17 h-17 rounded-full object-cover" /></Link>
                        </div>
                        <h3 className="text-lg font-bold">{offer.name}</h3>
                        <p>{offer.location}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
