import React from 'react'
// import Hero from './Hero/Hero';
import Heroes from './Hero/Heroes';
import Gallery from './Gallery/Gallery';
import PopularClasses from './PopularClasses/PopularClasses';
import PopularTeacher from './PopularTeacher/PopularTeacher';



const Home = () => {
  // console.log(import.meta.env.VITE_APIKEY);
  return (
    <section>
      <Heroes/>
      <div className='max-w-screen-xl mx-auto'>
        <Gallery/>
        <PopularClasses/>
        <PopularTeacher/>
      </div>
    </section>
  )
}

export default Home;