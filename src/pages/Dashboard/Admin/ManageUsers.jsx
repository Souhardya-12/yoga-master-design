// import React, { useEffect, useState } from 'react'
// import useAxiosFetch from '../../../hooks/useAxiosFetch'
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useNavigate } from 'react-router-dom';
// import { GrUpdate } from "react-icons/gr";
// import { FcDeleteDatabase } from 'react-icons/fc';

// const ManageUsers = () => {
//     const axiosFetch = useAxiosFetch();
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();
//     const [users,setUsers] = useState([]);

//     useEffect(() => {
//         axiosFetch.get('/users').then(res => setUsers(res.data)).catch(err => console.log(err))
//     },[]);

//     const handleDelete = (id) => {
//         axiosSecure.delete(`/delete-user/${id}`).then(res => {
//             alert("user deleted successfully")
//         }).catch(err => console.log(err))
//     }


//   return (
//     <div>
//         <h1 className='text-4xl font-bold text-center my-7'>Manage <span className='text-secondary'>Users</span></h1>
//         <div>
//             <div className='flex flex-col'>
//                 <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
//                     <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
//                         <div className='overflow-hidden'>
//                             <table className='min-w-full text-left text-sm  font-light'>
//                                 <thead className='border-b font-medium dark:border-neutral-500'>
//                                     <tr>
//                                         <th scope='col' className='px-6 py-4'>#</th>
//                                         <th scope='col' className='px-6 py-4'>Photo</th>
//                                         <th scope='col' className='px-6 py-4'>Name</th>
//                                         <th scope='col' className='px-6 py-4'>Role</th>
//                                         <th scope='col' className='px-6 py-4'>Update</th>
//                                         <th scope='col' className='px-6 py-4'>Delete</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {
//                                         users.map((user,idx) => <tr key={user._id} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
//                                             <td className='whitespace-nowrap px-6 py-4 font-medium'>{idx+1}</td>
//                                             <td className='whitespace-nowrap px-6 py-4'>
//                                                 <img src={user?.photoUrl} className='h-[35px] w-[35px]' alt="" />
//                                             </td>
//                                             <td className='whitespace-nowrap px-6 py-4'>{user.name}</td>
//                                             <td className='whitespace-nowrap px-6 py-4'>{user.role}</td>
//                                             <td className='whitespace-nowrap px-6 py-4'>
//                                                 <span onClick={() => navigate(`/dashboard/update-user/${user._id}`)} className='inline-flex items-center gap-2 cursor-pointer bg-green-500 py-1 rounded-md px-2 text-white'>Update <GrUpdate className='text-white'/></span>
//                                             </td>
//                                             <td className='whitespace-nowrap px-6 py-4'>
//                                                 <span onClick={() => handleDelete(user._id)} className='inline-flex items-center gap-2 cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white'>Delete <FcDeleteDatabase/></span>
//                                             </td>
//                                         </tr>)
//                                     }
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ManageUsers

import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import { FcDeleteDatabase } from 'react-icons/fc';

const ManageUsers = () => {
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [appliedStatus, setAppliedStatus] = useState({});

    useEffect(() => {
        // Fetch users data
        axiosFetch.get('/users').then(res => {
            setUsers(res.data);
            checkAppliedStatus(res.data); // Check the applied status for users
        }).catch(err => console.log(err))
    }, []);

    // Function to check if the user has applied as an instructor
    const checkAppliedStatus = async (usersList) => {
        const statusObj = {};
        for (const user of usersList) {
            try {
                const res = await axiosFetch.get(`/applied-instructors/${user.email}`);
                if (res.data) {
                    statusObj[user.email] = "Yes"; // If the user exists in applied table
                } else {
                    statusObj[user.email] = "No";
                }
            } catch (error) {
                console.log(`Error fetching applied status for ${user.email}:`, error);
                statusObj[user.email] = "No";
            }
        }
        setAppliedStatus(statusObj);
    }

    const handleDelete = (id) => {
        axiosSecure.delete(`/delete-user/${id}`).then(res => {
            alert("User deleted successfully");
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h1 className='text-4xl font-bold text-center my-7'>Manage <span className='text-secondary'>Users</span></h1>
            <div>
                <div className='flex flex-col'>
                    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                            <div className='overflow-hidden'>
                                <table className='min-w-full text-left text-sm  font-light'>
                                    <thead className='border-b font-medium dark:border-neutral-500'>
                                        <tr>
                                            <th scope='col' className='px-6 py-4'>#</th>
                                            <th scope='col' className='px-6 py-4'>Photo</th>
                                            <th scope='col' className='px-6 py-4'>Name</th>
                                            <th scope='col' className='px-6 py-4'>Role</th>
                                            <th scope='col' className='px-6 py-4'>Applied for Instructor</th>
                                            <th scope='col' className='px-6 py-4'>Update</th>
                                            <th scope='col' className='px-6 py-4'>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user, idx) => (
                                                <tr key={user._id} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                                                    <td className='whitespace-nowrap px-6 py-4 font-medium'>{idx + 1}</td>
                                                    <td className='whitespace-nowrap px-6 py-4'>
                                                        <img src={user?.photoUrl} className='h-[35px] w-[35px]' alt="" />
                                                    </td>
                                                    <td className='whitespace-nowrap px-6 py-4'>{user.name}</td>
                                                    <td className='whitespace-nowrap px-6 py-4'>{user.role}</td>
                                                    <td className='whitespace-nowrap px-6 py-4'>
                                                        {appliedStatus[user.email] || "No"}
                                                    </td>
                                                    <td className='whitespace-nowrap px-6 py-4'>
                                                        <span onClick={() => navigate(`/dashboard/update-user/${user._id}`)} className='inline-flex items-center gap-2 cursor-pointer bg-green-500 py-1 rounded-md px-2 text-white'>Update <GrUpdate className='text-white' /></span>
                                                    </td>
                                                    <td className='whitespace-nowrap px-6 py-4'>
                                                        <span onClick={() => handleDelete(user._id)} className='inline-flex items-center gap-2 cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white'>Delete <FcDeleteDatabase /></span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers;
