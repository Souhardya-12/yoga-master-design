import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaRegCopy } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
// import { TbMessages } from "react-icons/tb";
import { GiTeacher } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";

const AdminStats = ({users}) => {
    const [data,setData] = useState();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/admin-stats').then(res => setData(res.data)).catch(err => console.log(err))
    },[]);

    console.log(data)

  return (
    <div>
        <div className='grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8'>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-green-400'>
                    <FaUserFriends className='h-12 w-12 text-white'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Total Member</h3>
                    <p className='text-3xl'>{users?.length}</p>
                </div>
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-blue-400'>
                    <FaRegCopy className='h-12 w-12 text-white'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Approved Classes</h3>
                    <p className='text-3xl'>{data?.approvedClasses}</p>
                </div>
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-violet-400'>
                    <GiTeacher className='h-12 w-12 text-white'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Instructors</h3>
                    <p className='text-3xl'>{data?.instructors}</p>
                </div>
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-red-400'>
                    <MdPendingActions className='h-12 w-12 text-white'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Pending Classes</h3>
                    <p className='text-3xl'>{data?.pendingClasses}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminStats