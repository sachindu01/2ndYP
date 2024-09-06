import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> {/* Corrected grid template */}
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="Company Logo"/> {/* Added alt text for accessibility */}
                <p className='w-full md:w-2/3 text-gray-600'>
                    Footer for the company inventory and fund management system
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>contact@gmail.com</li>

                </ul>
            </div>
            <div className='col-span-3'> {/* Make this div span across all columns */}
                <hr className='my-4' />
                <p className='py-5 text-sm text-center'>Copyright 2024 @ forever.com - All Rights Reserved</p>
            </div>
            
        </div>
    </div>
  )
}

export default Footer
