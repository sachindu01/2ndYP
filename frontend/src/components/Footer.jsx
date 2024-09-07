import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> {/* Corrected grid template */}
            <div>
                <img src={assets.uni_logo1} className='mb-5 w-45' alt="Company Logo"/> {/* Added alt text for accessibility */}
                <p className='w-full md:w-2/3 text-gray-600'>
                    Smart inventory and fund management system by ACES
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>FundVentory x</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About us</a></li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li><a href="tel:+94812393470">+94 81 2393470</a></li>
                    <li><a href="mailto:headce@eng.pdn.ac.lk">headce@eng.pdn.ac.lk</a></li>

                </ul>
            </div>
            <div className='col-span-3'> {/* Make this div span across all columns */}
                <hr className='my-4' />
                <p className='py-5 text-sm text-center'>Copyright 2024 @ Faculty of Engineering – University of Peradeniya – All Rights Reserved</p>
            </div>
            
        </div>
    </div>
  )
}

export default Footer
