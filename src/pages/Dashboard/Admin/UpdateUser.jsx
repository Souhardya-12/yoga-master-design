import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useLoaderData } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateUser = () => {
    const {user} = useAuth();
    // console.log(user);
    const userCredentials = useLoaderData();
    console.log(userCredentials);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updateData = Object.fromEntries(formData);
    
        // Check if the role is updated to 'Instructor'
        const isUpdatedToInstructor = updateData.option === 'instructor' && userCredentials?.role !== 'instructor';
    
        axiosSecure.put(`/update-user/${userCredentials?._id}`, updateData).then(async (res) => {
            if (res.data.modifiedCount > 0) {
                alert("User updated successfully");
    
                // If updated to 'Instructor', delete the applied for instructor data
                if (isUpdatedToInstructor) {
                    try {
                        await axiosSecure.delete(`/as-instructor/${userCredentials?.email}`);
                        console.log("Applied instructor data deleted successfully.");
                    } catch (error) {
                        console.error("Error deleting applied instructor data:", error);
                    }
                }
            }
            console.log(res.data);
        }).catch(err => console.log(err));
    }
    



  return (
    <div>
        <h1 className='text-center text-4xl font-bold mt-5'>Updated by: <span className='text-secondary'>{user?.displayName}</span></h1>
        <p className='text-center'>Change details about <span className='font-bold text-red-400'>{userCredentials?.name}</span></p>
        {/* form  */}
        <section>
            <div className='mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                <div className='rounded-lg bg-white p-8 shadow-lg lg:p-12'>
                    <form  className='space-y-4' onSubmit={handleFormSubmit}>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <label htmlFor="name" className='ml-2 pb-4'>Name</label>
                                <input type="text" required defaultValue={userCredentials?.name ? userCredentials?.name : ''} id='name' name='name' placeholder='your name' className='w-full rounded-lg mt-3 border border-secondary outline-none p-3 text-sm' />
                            </div>
                            <div>
                                <label htmlFor="phone" className='ml-2'>Phone</label>
                                <input type="tel" required defaultValue={userCredentials?.phone ? userCredentials?.phone : ''} id='phone' name='phone' placeholder='phone number' className='w-full rounded-lg mt-3 border border-secondary outline-none p-3 text-sm' />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <label htmlFor="email" className='ml-2'>Email</label>
                                <p className='text-[12px] ml-2 text-red-400 '>Update email is not recommended. Please leave it default</p>
                                <input type="email" required defaultValue={userCredentials?.email} id='email' name='email' placeholder='email address' className='w-full rounded-lg mt-2 border border-secondary outline-none p-3 text-sm' />
                            </div>
                            <div>
                                <label htmlFor="skills" className='ml-2'>Skills</label>
                                <p className='text-[12px] ml-2 text-red-400 '>If the user is an instructor, then set skills, otherwise, leave it empty</p>
                                <input type="text" defaultValue={userCredentials?.skills ? userCredentials?.skills : ''} id='skills' name='skills' placeholder='skills' className='w-full rounded-lg mt-2 border border-secondary outline-none p-3 text-sm' />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <label htmlFor="address" className='ml-2'>Address</label>
                                <input type="text" required defaultValue={userCredentials?.address} id='address' name='address' placeholder='address' className='w-full rounded-lg mt-2 border border-secondary outline-none p-3 text-sm' />
                            </div>
                            <div>
                                <label htmlFor="photoUrl" className='ml-2'>Photo URL</label>
                                <input type="text" required defaultValue={userCredentials?.photoUrl} id='photoUrl' name='photoUrl' placeholder='photo URL' className='w-full rounded-lg mt-2 border border-secondary outline-none p-3 text-sm' />
                            </div>
                        </div>
                        <h1>Please select a role</h1>
                        <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                            <div>
                                <input type="radio" className='peer sr-only' id="option1" value="user" defaultChecked={userCredentials?.role === 'user' ? true : false} tabIndex="-1" name="option" />
                                <label htmlFor="option1" className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex="0"><span className='text-sm font-medium'>User</span></label>
                            </div>
                            <div>
                                <input type="radio" className='peer sr-only' id="option2" value="admin" defaultChecked={userCredentials?.role === 'admin' ? true : false} tabIndex="-1" name="option" />
                                <label htmlFor="option2" className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex="0"><span className='text-sm font-medium'>Admin</span></label>
                            </div>
                            <div>
                                <input type="radio" className='peer sr-only' id="option3" value="instructor" defaultChecked={userCredentials?.role === 'instructor' ? true : false} tabIndex="-1" name="option" />
                                <label htmlFor="option3" className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex="0"><span className='text-sm font-medium'>Instructor</span></label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="about" className='sr-only'>About</label>
                            <textarea name="about" id="about" className='w-full resize-none rounded-lg border border-secondary outline-none p-3 text-sm' placeholder="about user" rows="4" defaultValue={userCredentials?.about ? userCredentials?.about : ''} ></textarea>
                        </div>
                        <div className='mt-4'>
                            <button type='submit' className='inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
  )
}

export default UpdateUser