import React, { useState } from 'react';
import {Link, Outlet} from "react-router-dom";
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { FaUsers, FaHome } from 'react-icons/fa';
import { BsFillPostcardFill } from "react-icons/bs";
import { TbBrandAppleArcade } from "react-icons/tb";
import { IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { SiInstructure, SiGoogleclassroom } from "react-icons/si";
import { NavLink, useNavigate } from 'react-router-dom';
import { MdExplore, MdOfflineBolt, MdPayments, MdPendingActions } from 'react-icons/md';
import { GiFigurehead } from 'react-icons/gi';
import Swal from 'sweetalert2';
import Scroll from '../hooks/useScroll';
import { FadeLoader } from "react-spinners";


const adminNavItems = [
    {to: "/dashboard/admin-home", icon: <BiHomeAlt className='text-2xl'/>, label: "Dashboard Home"},
    {to: "/dashboard/manage-users", icon: <FaUsers className='text-2xl'/>, label: "Manage Users"},
    {to: "/dashboard/manage-class", icon: <BsFillPostcardFill className='text-2xl'/>, label: "Manage Class"},
    // {to: "/dashboard/manage-applications", icon: <TbBrandAppleArcade className='text-2xl'/>, label: "Applications"},
]

const instructorNavItem = [
    {to: "/dashboard/instructor-cp", icon: <FaHome className='text-2xl'/>, label: "Home"},
    {to: "/dashboard/add-class", icon: <MdExplore className='text-2xl'/>, label: "Add a class"},
    {to: "/dashboard/my-classes", icon: <IoSchoolSharp className='text-2xl'/>, label: "My Classes"},
    {to: "/dashboard/my-pending", icon: <MdPendingActions className='text-2xl'/>, label: "Pending Courses"},
    {to: "/dashboard/my-approved", icon: <IoMdDoneAll className='text-2xl'/>, label: "Approved Classes"},
]

const students = [
    {to: "/dashboard/student-cp", icon: <BiHomeAlt className='text-2xl'/>, label: "Dashboard"},
    {to: "/dashboard/enrolled-classes", icon: <SiGoogleclassroom className='text-2xl'/>, label: "My Enroll"},
    {to: "/dashboard/my-selected", icon: <BiSelectMultiple className='text-2xl'/>, label: "My Selected"},
    {to: "/dashboard/my-payments", icon: <MdPayments className='text-2xl'/>, label: "Payment History"},
    {to: "/dashboard/apply-instructor", icon: <SiInstructure className='text-2xl'/>, label: "Apply for Instructor"},
]

const lastMenuItems = [
    {to: "/", icon: <BiHomeAlt className='text-2xl'/>, label: "Main Home"},
    {to: "/trending", icon: <MdOfflineBolt className='text-2xl'/>, label: "Trending"},
    {to: "/contact-us", icon: <GiFigurehead className='text-2xl'/>, label: "Contact Us"},
]


const DashboardLayout = () => {
    const [open, setOpen] = useState(true);
    const {loader, logout} = useAuth();
    const {currentUser} = useUser();
    const navigate = useNavigate();
    const role = currentUser?.role;

    const handleLogout = () => {
        // e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout me!"
          }).then((result) => {
            if (result.isConfirmed) {
                logout().then(Swal.fire({
                    title: "Goodbye!",
                    text: "Your have been successfully logged out.",
                    icon: "success"
                  })).catch((err) => console.log(err))
                navigate('/');  
            }
            
          });
    }

    // const role = 'admin';

    if(loader) {
        return <div className='flex justify-center items-center h-screen'>
          <FadeLoader color="#0044ff" height={15} width={5} />
        </div>
      }

  return (
    <div className='flex'>
        <div className={`${open? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"} bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`}>
            <div className='flex gap-x-4 items-center'>
                <img onClick={() => setOpen(!open)} src="/yoga-logo.png" alt="" className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`} />
                <Link to='/'>
                    <h1 onClick={() => setOpen(!open)} className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}>Yoga Master</h1>
                </Link>
            </div>

            {/* Navlinks */}

            {/* admin roles */}
            {
                role === 'admin' &&  (<ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                    {
                        role === 'admin' && adminNavItems.map((MenuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink to={MenuItem.to} className={({isActive}) => 
                                `flex ${isActive ? "bg-red-500 text-white ": "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{MenuItem.icon}
                                    <span className={`${!open && 'hidden'} origin-left duration-200`}>{MenuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            )}

            {/* instructor roles */}
            {
                role === 'instructor' &&  (<ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                    {
                        role === 'instructor' && instructorNavItem.map((MenuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink to={MenuItem.to} className={({isActive}) => 
                                `flex ${isActive ? "bg-red-500 text-white ": "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{MenuItem.icon}
                                    <span className={`${!open && 'hidden'} origin-left duration-200`}>{MenuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            )}

            {/* student roles */}
            {
                role === 'user' &&  (<ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                    {
                        role === 'user' && students.map((MenuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink to={MenuItem.to} className={({isActive}) => 
                                `flex ${isActive ? "bg-red-500 text-white ": "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{MenuItem.icon}
                                    <span className={`${!open && 'hidden'} origin-left duration-200`}>{MenuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            )}

            <ul className='pt-6'>
                <p className={`ml-3 uppercase mb-3 text-gray-500 ${!open && "hidden"}`}><small>Useful Links</small></p>
                {
                    lastMenuItems.map((MenuItem, index) => (
                        <li key={index} className='mb-2'>
                            <NavLink to={MenuItem.to} className={({isActive}) => 
                            `flex ${isActive ? "bg-red-500 text-white ": "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{MenuItem.icon}
                                <span className={`${!open && 'hidden'} origin-left duration-200`}>{MenuItem.label}</span>
                            </NavLink>
                        </li>
                    ))
                }
                <li>
                    <NavLink onClick={() => handleLogout()} className={({isActive}) => 
                    `flex ${isActive ? "bg-red-500 text-white ": "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}><BiLogInCircle className='text-2xl'/>
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Logout</span>
                    </NavLink>
                </li>
            </ul>

        </div>

        <div className='h-screen overflow-y-auto px-8 flex-1'>
            <Scroll/>
            <Outlet/>
        </div>

    </div>
  )
}

export default DashboardLayout