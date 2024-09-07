import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom'; // Import Link

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <Link to='/collection'>
          <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Inventory Request Icon" /> {/* Adjust width to match the first image */}
        </Link>
        <p className='font-semibold'>Fund Request</p>
        <p className='text-gray-400'>Easily request and manage inventory items</p>
      </div>
      <div>
        <Link to='/collection'>
          <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Fund Request Icon" /> {/* Adjust width to match the first image */}
        </Link>
        <p className='font-semibold'>Fund Request</p>
        <p className='text-gray-400'>Effortlessly apply for and manage project funds.</p>
      </div>
    </div>
  );
};

export default OurPolicy;
