import React, { useEffect, useState } from 'react'
import useUser from '../../../../hooks/useUser'
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { FiBriefcase, FiMail, FiSend, FiUserPlus } from "react-icons/fi";

const AsInstructor = () => {
  const {currentUser} = useUser();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true)
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch.get(`/applied-instructors/${currentUser?.email}`).then(res => {
      console.log(res.data)
      setSubmittedData(res.data)
      setLoading(false)
    }).catch(err => console.log(err))
  },[]);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;
    // console.log(name,email,experience)
    const data = {
      name,
      email,
      experience
    }
    axiosFetch.post(`/as-instructor`, data).then(res => {
      console.log(res.data)
      alert('Applied successfully')
    })
  }

  return (
    <div className='my-20'>
      <div>
        {
          !submittedData?.name && (<div className='md:w-1/2'>
            <form onSubmit={onSubmit}>
              <div className='flex w-full'>
                <div className=' mb-4 w-full'>
                <label className='text-gray-500' htmlFor="name">Name</label>
                  <div className='flex items-center mt-1'>
                      <FiUserPlus className='text-gray-500'/>
                      <input type="text" id='name' name='name' defaultValue={currentUser?.name} disabled readOnly className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none' />
                    </div>
                </div>
                <div className='mb-4 w-full'>
                  <label htmlFor="email" className='text-gray-500'>Email</label>
                  <div className='flex items-center mt-1'>
                    <FiMail className='text-gray-500'/>
                    <input type="email" id='email' name='email' disabled readOnly defaultValue={currentUser?.email} className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none' />
                  </div>
                </div>
              </div>
              <div className='mb-4 w-full'>
                <label htmlFor="experience" className='text-gray-500'>Experience</label>
                <div className='flex items-center mt-1'>
                  <FiBriefcase className='text-gray-500' />
                  <textarea name="experience" placeholder='tell us about your experience' id="experience" className='ml-2 rounded-lg px-2 placeholder:text-sm py-1 w-full border border-gray-300 focus:border-secondary outline-none resize-none'></textarea>
                </div>
              </div>
              <div className='text-center flex justify-center '>
                <button type='submit' className='flex items-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none'>
                  <FiSend className='mr-2'/>
                  Submit
                </button>
              </div>
            </form>
          </div>)
        }
      </div>
    </div>
  )
}

export default AsInstructor