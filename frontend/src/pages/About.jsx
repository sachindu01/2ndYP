import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>

      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>At Forever, we believe that fashion is more than just clothing—it's a form of self-expression, a way to tell your story. Our brand is built on the idea that great style is forever, and our mission is to provide you with high-quality, stylish pieces that you'll love to wear now and cherish for years to come</p>
        <p>We are committed to sustainability, quality, and inclusivity. Every piece in our collection is crafted with care, using materials that are not only beautiful but also durable and responsibly sourced</p>
        <b className='text-gray-600'>Our Mission</b>
        <p>Forever is more than just a fashion brand—it's a community. We aim to inspire confidence and creativity in our customers, empowering them to embrace their individuality through fashion</p>

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