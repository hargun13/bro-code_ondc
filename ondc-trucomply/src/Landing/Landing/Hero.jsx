import React, {useState} from 'react'
import Navbar from './Navbar'
import img1 from './hero/1.jpg'

import { FaCheckCircle } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";


const Carousel = ({ textData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textData.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + textData.length) % textData.length);
    };
  
    return (
        <div className="text-xs w-[80%] flex items-center justify-between ">
            <div className="w-[75%]">
                <p >{textData[currentIndex]}</p>
            </div>
            <div className="flex w-[20%] items-center justify-between">
                <FaArrowCircleLeft onClick={handlePrev} size={30} className='text-[#A0BDFF] cursor-pointer'/>
                <FaArrowCircleRight onClick={handleNext} size={30} className='text-[#A0BDFF] cursor-pointer'/>
            </div>
        </div>
    );
  };


const Hero = () => {

    const text = [
        "Empower your business with TruComply: Modern Compliance Solutions for Tomorrow’s World.",
        "Seamlessly navigate the regulatory landscape and unlock your business potential.",
        "Stay ahead of the curve with innovative compliance technology, tailored to your needs.",
      ];
    

  return (
    <div className='h-auto bg-white pb-20 ' >
        <Navbar />

        <div className='md:flex w-full items-center justify-center mt-5 text-black'>

            <div className='md:w-[55%] px-16'>
                
                <div className='flex items-center justify-start text-[10px] gap-3'>
                    <p className='bg-[#F0F1EB] py-1 px-3 rounded-full font-bold'>Compliance</p>
                    <p className='bg-[#F0F1EB] py-1 px-3 rounded-full font-bold'>Co-Operate</p>
                </div>

                <h1 className='md:text-[45px] text-5xl font-semibold py-3 '>Unlocking success through</h1> 
                <h1 className='md:text-[45px] text-5xl font-semibold pt-3 -ml-4'><span className='bg-[#A0BDFF] px-4 rounded-full'>Compliance Excellence</span></h1>

                <p className="text-sm py-10 pr-40 font-bold my-5">
                TruComply offers modern compliance solutions designed to help businesses seamlessly navigate the landscape, unlocking their full potential in tomorrow’s world.
                </p>

                <div className='flex items-center gap-7 uppercase text-xs font-extrabold'>
                    <p className='flex items-center justify-start gap-1'><FaCheckCircle size={20} className='text-[#A0BDFF]'/>Alert System</p>
                    <p className='flex items-center justify-start gap-1'><FaCheckCircle size={20} className='text-[#A0BDFF]'/>Checklist Generator</p>
                    <p className='flex items-center justify-start gap-1'><FaCheckCircle size={20} className='text-[#A0BDFF]'/>Guidance System</p>
                </div>
                
                <hr className=' border border-[#F0F1EB] my-3 w-[80%]'/>

                <Carousel textData={text}/>
                
            </div>

            <div className='md:w-[45%] flex justify-center'>
                    
                <img src={img1} alt="hero-1" />

            </div>


        </div>


    </div>
  )
}

export default Hero