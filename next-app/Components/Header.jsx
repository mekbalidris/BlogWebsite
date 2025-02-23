import Image from 'next/image'
import { assets } from '../Assets/assets'
import React from 'react'

function Header() {
  return (
    <div className='pt-5 px-5 md:px-12 '>
    <div className='flex justify-between items-center'>
        <Image src={assets.logo} width={180} alt='logo' className='w-[130px]'/>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border-2 border-black'>Get Started</button>
    </div>
    <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>
        Consequat ad dolore consequat est ea culpa ex consequat. Cupidatat id magna quis sint exercitation esse.
        </p>
        <form className='flex justify-between max-w-[500px] sm:scale-100 mx-auto mt-10 border border-black'>
            <input type="email" placeholder='Enter your Email' className='pl-4 outline-none'/>
            <button type='submit' className='border-2 border-black bg-black text-white py-4 px-4 sm:px-8 active:bg-gray-600'>Subscribe</button>
        </form>
    </div>
    </div>
  )
}

export default Header