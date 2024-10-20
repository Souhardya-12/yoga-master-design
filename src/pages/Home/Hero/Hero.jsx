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
              <h1 className='md:text-7xl text-4xl font-bold'>Best Yoga Course Online</h1>
              <div className='md:w-1/2'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae deserunt sunt facilis! Exercitationem vero blanditiis reiciendis dolorum sit suscipit laboriosam molestiae. Dolorum esse sapiente nihil veritatis magni animi repellat voluptatibus!
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