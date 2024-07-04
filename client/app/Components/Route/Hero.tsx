'use client';
import React ,{FC}from 'react'
import Link from "next/link"
import Image from 'next/image'
import { BiSearch } from 'react-icons/bi'

type Props = {}

 const Hero:FC <Props> = ( Props) => {
  return (
    <div className='w-full h-screen relative flex flex-col 800px:flex-row   items-center justify-between pt-[50px]'>
        <div className=' 1000px:top-[unset] mx-10 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation rounded-[100%] pt-[50px]'>
            <div className='w-[100%]  flex h-[100%] items-center justify-center  1000px:pt-0 z-10'>
                <Image
                src={require("../../../public/assests/undraw_learning_sketching_nd4f.png")}
                alt='Vector'
                className='object-contain  w-[80%] mb-10 max-w-[85%] h-[auto] z-[10]'
                />
            </div>
          
        </div>
        <div className=' 800px:w-[50%] w-[80%] justify-center  flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[1px]'>
                <h2 className='dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin  1000px:leading-[75px] 1500px:w-[600px]'>Improve Your Online Learning Experience Better Instantly</h2>
                <p className='dark:text-white text-[#000000c7] text-[12px] px-3 w-full 1000px:text-[15px] font-[400] font-Josefin  1000px:leading-[30px] 1500px:w-[600px]'> We have 40k+ Online Courses & 500k+ Online registerd student.Find your desired Courses from them. And dont forget to try our study buddy to get help for your studies.</p>
        <Link href='http://127.0.0.1:5000/'>
          <button className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out'>
            Study Buddy
          </button>
        </Link>    
        </div>
    </div>
  )
}

export default Hero
