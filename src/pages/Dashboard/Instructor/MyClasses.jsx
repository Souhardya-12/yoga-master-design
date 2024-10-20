import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const MyClasses = () => {
    const [classes, setClasses] = useState([]);
    const {currentUser,isLoading} = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/classes/${currentUser?.email}`).then(res => setClasses(res.data)).catch(err => console.log(err))
    },[isLoading]);

  return (
    <div>
        <div className='my-9'>
            <h1 className='text-4xl font-bold text-center'>My <span className='text-secondary'>Classes</span></h1>
            <div>
                <p className='text-[12px] text-center my-2'>Here you can see all the classes you have added along with their status</p>
            </div>
        </div>
        <div>
            {
                classes.length === 0 ? <div className='text-center text-2xl font-bold mt-10'>You have not added any class</div> : <div>
                    {
                        classes.map((cls,index) => (<div key={index} className='mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg'>
                            <div className='bg-white flex rounded-lg gap-8 shadow p-4'>
                                <div>
                                    <img src={cls.image} alt="" className='max-h-[200px] max-w-[300px]' />
                                </div>
                                <div className='w-full'>
                                    <h2 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2'>{cls.name}</h2>
                                    <div>
                                        <div>
                                            <h1 className='font-bold mb-3'>Some info: </h1>
                                            <h1 className='text-secondary my-2'>
                                                <span className='text-black '>Total Students</span> :{" "}{cls.totalEnrolled ? cls.totalEnrolled : 0}
                                            </h1>
                                            <h1 className='text-secondary'>
                                                <span className='text-black '>Total Seats</span> :{" "}{cls.availableSeats}
                                            </h1>
                                            <h1 className='text-secondary my-2'>
                                                <span className='text-black'>Status</span> :{" "}<span className={`font-bold ${cls.status === "pending"?"text-orange-400": cls.status === "checking"? "text-yellow-300": cls.status === "approved"? "text-green-500":"text-red-600"}`}>{cls.status}</span>
                                            </h1>
                                        </div>
                                        <div>
                                            <h1 className='font-bold mb-3'>.....</h1>
                                            <h1 className='text-secondary my-2'><span className='text-black'>Price</span> : {cls.price} <span className='text-black'>$</span></h1>
                                            <h1 className='text-secondary my-2'><span className='text-black'>Submitted</span> : <span className=''>{cls.submitted ? moment(cls.submitted).format('MMMM Do YYYY') : 'No date'}</span></h1>
                                        </div>
                                        <div className='w-1/3'>
                                            <h1 className='font-bold mb-3'>Action: </h1>
                                            {/* <button onClick={() => handleFeedback(cls._id)} className='px-3 bg-orange-400 font-bold py-1 text-white w-full rounded-lg'>View Feedback</button> */}
                                            <Link to={`/dashboard/course-details/${cls._id}`}><button className='px-3 bg-green-500 font-bold py-1 text-white w-full my-3 rounded-lg'>View Details</button></Link>
                                            <button className='px-3 bg-secondary font-bold py-1 text-white w-full rounded-lg' onClick={() => navigate(`/dashboard/update/${cls._id}`)}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>))
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default MyClasses