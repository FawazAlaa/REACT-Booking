import React from 'react';
import Navbar from '../../Components/Navbar/Navbar.jsx';
import SideBar from '../../Components/SideBar/SideBar.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import RecommendedHotels from '../../Components/Recommended/RecommendedHotels.jsx';
import BestOffer from '../../Components/BestOffer/BestOffer.jsx';


export default function Homepage() {
  return (
    <>
     {/* Hero section with positioning */}
      <div className="relative min-h-screen">
        <Navbar />
        <SideBar />
        <SearchBar />
        <RecommendedHotels />
      </div>

      {/* New section: no longer affected by absolute/relative */}
     <section className="w-full flex justify-center bg-white pt-30">
  <div className="max-w-4xl w-full px-4 ml-5">
    <BestOffer />
  </div>
</section>
    </>
    
  )
}
