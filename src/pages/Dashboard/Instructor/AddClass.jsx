import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useUser from '../../../hooks/useUser';


const KEY = import.meta.env.VITE_IMG_TOKEN

const AddClass = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const axiosSecure = useAxiosSecure();
    const {currentUser, isLoading} = useUser();
    const [image, setImage] = useState(null);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData)

        const newData = Object.fromEntries(formData);
        formData.append('file', image);
        // console.log(newData)

        fetch(API_URL, {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(data => {
            console.log(data)
            if(data.success == true) {
                console.log(data.data.display_url);
                newData.image = data.data.display_url;
                newData.instructorName = currentUser?.name;
                newData.instructorEmail = currentUser?.email;
                newData.status = 'pending';
                newData.submitted = new Date();
                newData.totalEnrolled = 0;
                axiosSecure.post('/new-class', newData).then(res => {
                    alert('Class added successfully');
                    console.log('res.data');
                })
            }
        })

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    if(isLoading) {
        return <div>Loading...</div>
    }


  return (
    <div>
        <div className='my-10 '>
            <h1 className='text-center text-3xl font-bold'>Add your course</h1>
        </div>
        <form onSubmit={handleFormSubmit} className='mx-auto p-6 bg-white rounded shadow'>
            <div className='grid grid-cols-2 w-full gap-3 items-center'>
                <div className='mb-6'>
                    <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>Course name</label>
                    <input type="text" required placeholder='Your course name' name="name" id="name" className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
                </div>
                <div className='mb-6'>
                    <label htmlFor="image" className='block text-gray-700 font-bold mb-2'>Course thumbnail</label>
                    <input type="file" onChange={handleImageChange} required name='image' className='block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4'/>
                </div>
            </div>
            <div>
                <h1 className='text-[12px] my-2 ml-2 text-secondary'>You cannot change your name or email</h1>
                <div className='grid gap-3 grid-cols-2'>
                    <div className='mb-6'>
                        <label htmlFor="instructorName" className='block text-gray-700 font-bold mb-2'>Instructor name</label>
                        <input type="text" defaultValue={currentUser?.name} readOnly disabled placeholder='Instructor name' name='instructorName' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="instructorEmail" className='block text-gray-700 font-bold mb-2'>Instructor email</label>
                        <input type="email" defaultValue={currentUser?.email} readOnly disabled placeholder='Instructor name' name='instructorEmail' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 w-full gap-3 items-center'>
                <div className='mb-6'>
                    <label htmlFor="availableSeats" className='block text-gray-700 font-bold mb-2'>Available seats</label>
                    <input type="number" required placeholder='How many seats available' name="availableSeats" className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
                </div>
                <div className='mb-6'>
                    <label htmlFor="price" className='block text-gray-700 font-bold mb-2'>Price</label>
                    <input type="number" required placeholder='How much does it cost' name='price' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
                </div>
            </div>
            <div className='mb-6'>
                <label htmlFor="videoLink" className='block text-gray-700 font-bold mb-2'>Youtube video or playlist link</label>
                <input type="text" required placeholder='Link to your course videos' name='videoLink' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
            </div>
            <div className='mb-6'>
                <label htmlFor="description" className='block text-gray-700 font-bold mb-2'>Detailed Course Material</label>
                <textarea name="description" placeholder='The entire content of your course' className='resize-none border border-secondary w-full p-2 rounded-lg outline-none' rows="4"></textarea>
            </div>
            <div className='text-center w-full'>
                <button className='bg-secondary w-full hover:bg-green-500 duration-200 text-white font-bold py-2 px-4 rounded' type='submit'>Add Your Course</button>
            </div>
        </form>
    </div>
  )
}

export default AddClass