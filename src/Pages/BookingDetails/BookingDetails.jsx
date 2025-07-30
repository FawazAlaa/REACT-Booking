import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addBooking } from '../../Store/HotelSlicer';
import { Interceptor } from '../../Interceptor/Interceptor';
import Navbar from '../../Components/Navbar/Navbar';
import SideBar from '../../Components/SideBar/SideBar';
import check from '../../assets/check 1.png'

export default function BookingDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bookingHotel, setBookingHotel] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isBookingSuccess, setBookingSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    Interceptor.get(`/hotels/${id}`)
      .then((res) => {
        setBookingHotel(res?.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!bookingHotel) return null;

  const pricePerNight = bookingHotel.pricing?.[0]?.price || 0;

  const nights =
    checkIn && checkOut
      ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      : 0;

  const priceInfo = bookingHotel.pricing?.[0];
  const discountedPrice = priceInfo?.discountedPrice || 0;
  const originalPrice = priceInfo?.originalPrice || 0;
  const priceUnit = priceInfo?.priceUnit || "night";
  const discountLabel = priceInfo?.discount || "";
  const totalPrice = nights * discountedPrice;

  const onSubmit = (data) => {
    const payload = {
      ...data,
      hotelId: id,
      hotelName: bookingHotel.name,
      hotelImage: bookingHotel.images?.main,
      checkIn,
      checkOut,
      nights,
      totalPrice,
    };
    dispatch(addBooking(payload));
    setBookingSuccess(true);
  };





  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar />
      <SideBar />

      <div className="flex justify-between  px-10 py-12">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-[55%] bg-white p-6 rounded shadow ml-55">
          <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
          <p className="text-sm text-gray-600 mb-6">
            {bookingHotel.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <select {...register('title', { required: true })} className="border p-2 rounded">
              <option value="">Select Title</option>
              <option>Mr</option>
              <option>Ms</option>
            </select>
            <input {...register('firstName', { required: true })} placeholder="First Name" className="border p-2 rounded" />
            <input {...register('lastName', { required: true })} placeholder="Last Name" className="border p-2 rounded" />
            <input {...register('email', { required: true })} placeholder="Email" className="border p-2 rounded" />
            <select {...register('country', { required: true })} className="border p-2 rounded">
              <option value="">Select Country</option>
              <option>Egypt</option>
              <option>Germany</option>
              <option >Greece</option>
              <option >USA</option>
            </select>
            <input {...register('mobile', { required: true })} placeholder="Mobile" className="border p-2 rounded" />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Booking Dates</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label htmlFor="checkIn" className="block text-sm text-gray-600 mb-1">Check-In</label>
              <input
                id="checkIn"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="checkOut" className="block text-sm text-gray-600 mb-1">Check-Out</label>
              <input
                id="checkOut"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              {...register('cardNumber', {
                required: true,
                pattern: {
                  value: /^\d{16}$/,
                  message: 'Card number must be exactly 16 digits'
                }
              })}
              placeholder="Card Number"
              className="border p-2 rounded col-span-2"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm col-span-2">{errors.cardNumber.message}</p>}

            <input
              {...register('cvv', {
                required: true,
                pattern: {
                  value: /^\d{3}$/,
                  message: 'CVV last 3 digits found on the back of your card'
                }
              })}
              placeholder="CVV"
              className="border p-2 rounded"
            />
            {errors.cvv && <p className="text-red-500 text-sm col-span-2">{errors.cvv.message}</p>}

            <input
              {...register('expiry', { required: true })}
              placeholder="Expiry Date (MM/YY)"
              className="border p-2 rounded"
            />
            <input
              {...register('cardHolder', { required: true })}
              placeholder="Card Holder Name"
              className="border p-2 rounded col-span-2"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Pay Now
          </button>
        </form>

        {/* Summary */}
        <div className="w-[30%] bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <img src={bookingHotel.images?.main} alt="Hotel" className="w-full h-40 object-cover rounded mb-4" />
          <p className="font-bold text-lg mb-1">{bookingHotel.name}</p>

          {priceInfo && (
            <div className="mt-2 text-lg">
              <span className="text-red-600 font-bold">{discountedPrice} USD</span>
              <span className="text-sm text-gray-500 font-medium ml-2 line-through">{originalPrice} USD</span>
              <span className="text-sm text-green-600 font-bold ml-2">{discountLabel}</span>
              <span className="text-sm text-gray-500 ml-1">/ {priceUnit}</span>
            </div>
          )}

          <div className="mt-4 text-sm">
            <p><strong>Check-In:</strong> {checkIn || '—'}</p>
            <p><strong>Check-Out:</strong> {checkOut || '—'}</p>
            <p><strong>Nights:</strong> {nights}</p>
            <div className="my-4 border-t-2 border-gray-300 w-full"></div>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
          </div>
        </div>

      </div>
      {isBookingSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <img
              src={check}
              alt="Success"
              className="mx-auto mb-4 w-20 h-20"
            />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Success</h2>
            <p className="text-gray-700 mb-6">Your booking has been confirmed.</p>
            <button
              onClick={() => {
                navigate('/MyBookings') 
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" 
            >
              View All Bookings
            </button>
          </div>
        </div>
      )}
    </div>





  );
}
