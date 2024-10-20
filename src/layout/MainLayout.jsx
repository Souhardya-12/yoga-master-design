import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/headers/Navbar';
import Footer from '../components/headers/Footer';

const MainLayout = () => {
  return (
    <main className="bg-white dark:bg-black overflow-hidden">
        <Navbar />
        <Outlet/>
        <Footer/>
    </main>
  )
}

export default MainLayout;