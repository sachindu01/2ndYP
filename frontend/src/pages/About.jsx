import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>

      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to Fundventory, your one-stop solution for managing both project funds and inventory with ease. Our platform is designed to streamline the process of tracking and managing resources, ensuring that students and administrators have the tools they need to efficiently handle requests, approvals, and inventory distribution.</p>
        <p>With Fundventory, users can easily check the availability of items, submit funding requests, and monitor the status of their projects—all in one place.</p>
        <b className='text-gray-600'>Our Mission</b>
        <p>Our mission at Fundventory is to empower academic institutions by providing a seamless and efficient platform for managing project funds and inventory. We strive to streamline resource allocation, improve transparency, and enhance the user experience for students, faculty, and administrators.</p>

        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-200'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assuarance:</b>
          <p className='text-gray-600'>We believe that fashion should be accessible to everyone, regardless of size, shape, or background, which is why we offer a wide range of sizes and styles that cater to diverse tastes and body types</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience:</b>
          <p className='text-gray-600'>Our collections are thoughtfully curated to offer you timeless pieces that fit seamlessly into your busy life</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our collections are thoughtfully curated to offer you timeless pieces that fit seamlessly into your busy life</p>
        </div>
        
      </div>
      

    
    </div>
  )
}

export default About