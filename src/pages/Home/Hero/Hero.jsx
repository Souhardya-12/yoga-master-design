import React from 'react'
import bgImg from "../../../assets/home/banner-1.jpg"
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/register');
  }
  const handleClasses = () => {
    navigate('/classes');
  }

  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
        <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
          <div>
            <div className='space-y-4 '>
              <p className='md:text-4xl text-2xl'>We Provide</p>
              <h1 className='md:text-7xl text-4xl font-bold'>Best Yoga Courses Online</h1>
              <div className='md:w-1/2'>
                <p>
                  Welcome to our online yoga platform, where you can explore a variety of classes tailored to all levels. Enjoy expert guidance, personalized programs, and a supportive community to enhance your practice anytime, anywhere.
                </p>
              </div>
              <div className='flex flex-wrap items-center gap-5'>
                <button onClick={() => handleLogin()} className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button>
                <button onClick={() => handleClasses()} className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Courses</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero