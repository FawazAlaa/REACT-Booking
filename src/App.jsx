import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/HomePage/Homepage'
import LoginPage from './Pages/Login/LoginPage'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import IsLogged from './Context/IsLogged'
import React from 'react'
import { Authentication } from './Authentication/Authen'
import Details from './Pages/Detailspage/Details'
import { Toaster } from 'react-hot-toast'
import HotelDetails from './HotelDetails/HotelDetails'
import BookingDetails from './Pages/BookingDetails/BookingDetails'
import MyBookings from './Pages/MyBookings/MyBookings'
import NotFound from './Pages/NotFound/NotFound'

function App() {

  return (
    <>
      <IsLogged>

        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/Details" element={
            <Authentication>
              <Details />
            </Authentication>} />

          <Route path='/HotelDetails/:id' element={
            <Authentication>
              <HotelDetails />
            </Authentication>} />
          <Route path='/BookingDetails/:id' element={

            <Authentication>
              <BookingDetails />
            </Authentication>}></Route>

          <Route path='/MyBookings' element={

            <Authentication>
              <MyBookings />
            </Authentication>}></Route>


          <Route path="*" element={<NotFound/>} />
        </Routes>
      </IsLogged>
    </>
  )
}

export default App
