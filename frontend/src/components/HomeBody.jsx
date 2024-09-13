import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom'; 

const HomeBody = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <Link to='/inventory'>
          <img src={assets.inventory_icon} className='w-12 m-auto mb-5' alt="Inventory Request Icon" /> 
        <p className='font-semibold'>Request Items</p>
        </Link>
        <p className='text-gray-400'>Easily request and manage inventory items</p>
      </div>
      <div>
        <Link to='/fund-form'>
          <img src={assets.fund_icon} className='w-12 m-auto mb-5' alt="Fund Request Icon" /> 
        <p className='font-semibold'>Request fund</p>
        </Link>
        <p className='text-gray-400'>Effortlessly apply and manage project funds.</p>

      </div>
    </div>
  );
};

export default HomeBody;
