import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { DialogActions } from "@mui/material";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from 'react-icons/fa';
import { GiClassicalKnowledge } from "react-icons/gi"
import bannerImg1 from "../../assets/home/banner-1.jpg";
import { MdBookOnline } from 'react-icons/md';

const SingleClass = () => {
    const course = useLoaderData();
    // console.log(course)
    const { currentUser } = useUser();
    // console.log(currentUser?.role)
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleSelect = (id) => {
        // console.log(id)
        axiosSecure.get('/enrolled-classes/${currentUser?.email}').then(res => setEnrolledClasses(res.data)).catch((err) => console.log(err))

        if (!currentUser) {
            alert("please login");
            return navigate("/login");
        }

        axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
            .then(res => {
                if (res.data.classId === id) {
                    return alert("already selected")
                } else if (enrolledClasses.find(item => item.classes._id === id)) {
                    return alert("already enrolled")
                } else {
                    const data = {
                        classId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    }
                    axiosSecure.post('/add-to-cart', data)
                        .then(res => {
                            alert("added to cart successfully")
                            console.log(res.data)
                        })
                }
            })

    }

    return (
        <>
        <div className='font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto' data-new-gr-c-s-check-loaded="14.1157.0" data-gr-ext-installed="">
            {/* breadcrumb or header */}
            <div className='breadcrumbs bg-blue-300 py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat'>
                <div className='container text-center'>
                    <h2>Course Details</h2>
                </div>
            </div>
            <div className='nav-tab-wrapper tabs section-padding mt-8'>
                <div className='container'>
                    <div className='grid grid-cols-12 md:gap-[30px]'>
                        {/* left side */}
                        <div className='lg:col-span-8 col-span-12'>
                            <div className='single-course-details'>
                                <div className='xl:h-[470px] h-[350px] mb-10 course-main-thumb'>
                                    <img src={course?.image} alt="" className='rounded-md object-fut w-full h-full block' />
                                </div>
                                <h2 className='text-2xl mb-2'>{course?.name}</h2>
                                <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center'>
                                    <div className='flex space-x-4 items-center group'>
                                        <div className='flex-none'>
                                            <div className='h-12 w-12 rounded'>
                                                <img src="https://fastly.picsum.photos/id/177/2515/1830.jpg?hmac=G8-2Q3-YPB2TreOK-4ofcmS-z5F6chIA0GHYAe5yzDY" alt="" className='object-cover w-full h-full rounded' />
                                            </div>
                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-secondary'>
                                                Trainer
                                                <a href="#" className='text-black'>: {course.instructorName}</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className='text-secondary'>
                                            Last Update:
                                            <a href="#" className='text-black ml-1'>
                                                {new Date(course.submitted).toLocaleDateString()}
                                            </a>
                                        </span>
                                    </div>
                                </div>
                                <div className='new-tab-wrapper mt-12'>
                                    <ul id='tabs-nav' className='course-tab mb-8'>
                                        <li className='active'>
                                            <a href="#tab1">Overview</a>
                                        </li>
                                        <li>
                                            <a href="#tab2">Curriculum</a>
                                        </li>
                                        <li>
                                            <a href="#tab3">Instructor</a>
                                        </li>
                                        <li>
                                            <a href="#tab4">Reviews</a>
                                        </li>
                                    </ul>
                                    <div id='tabs-content'>
                                        <div id='tab1' className='tab-content'>
                                            <div>
                                                <h3 className='text-2xl mt-8'>Course Description</h3>
                                                <p className='mt-4'>
                                                    This tutorial is designed to help you learn yoga effectively and thoroughly. It will guide you through each step with clear instruction, helping you build a solid foundation for your practice. You'll gain flexibility, strength, and mental clarity as you progress through the course.
                                                    <br /><br />In addition to learning key yoga principles and strategies, you'll discover practical ways to integrate these concepts into your daily life. Whether you're a beginner or looking to deepen your practice, this course offers the tools and guidance you need to enhance your well-being and mindfulness.
                                                </p>
                                                <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                                    <h4 className='text-2xl'>What you will learn?</h4>
                                                    <ul className='grid sm:grid-cols-2 grid-cols-1 gap-6'>
                                                        <li className='flex space-x-3'>
                                                            <div className='flex-none relative top-1'>
                                                                <img src="/correct-mark.png" alt="" />
                                                            </div>
                                                            <div className='flex-1'>
                                                                Learn how perspective works and how to incorporate your art
                                                            </div>
                                                        </li>
                                                        <li className='flex space-x-3'>
                                                            <div className='flex-none relative top-1'>
                                                                <img src="/correct-mark.png" alt="" />
                                                            </div>
                                                            <div className='flex-1'>
                                                                You can practice yoga at home anytime, anywhere.
                                                            </div>
                                                        </li>
                                                        <li className='flex space-x-3'>
                                                            <div className='flex-none relative top-1'>
                                                                <img src="/correct-mark.png" alt="" />
                                                            </div>
                                                            <div className='flex-1'>
                                                                Transform your space into a peaceful yoga studio.
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className='text-2xl'>What you will gain?</h4>
                                                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                                                        <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                            <span className='flex-none'>
                                                                <img src="/logo.png" alt="" />
                                                            </span>
                                                            <span className='flex-1 text-black'>
                                                                Computer/Mobile
                                                            </span>
                                                        </div>
                                                        <div className='bg-white rounded px-5 py-18px] flex shadow-box2 space-x-[10px] items-center'>
                                                            <div className='flex-none'>
                                                                <img src="/logo.png" alt="" />
                                                            </div>
                                                            <span className='flex-1 text-black'>
                                                                Paper &amp; Pencil
                                                            </span>
                                                        </div>
                                                        <div className='bg-white rounded px-5 py-[18] flex shadow-box2 space-x-[10px] items-center'>
                                                            <div className='flex-none'>
                                                                <img src="/logo.png" alt="" />
                                                            </div>
                                                            <span className='flex-1 text-black'>
                                                                Internet Connect
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id='tab2' className='tab-content'>
                                            <div>
                                                <h3 className='text-2xl mt-8 '>Lesson Plan</h3>
                                                <p className='mt-4'>
                                                    This tutorial is designed to help you learn yoga quickly and effectively, with a strong focus on both the fundamentals and advanced practices. You'll explore various yoga postures, breathing techniques, and mindfulness exercises aimed at enhancing your physical strength, flexibility, and mental clarity. Our structured lessons ensure that you gain a deep understanding of yoga principles, from improving posture and balance to mastering meditation for stress relief.
                                                    <br /><br />You'll not only be introduced to key yoga concepts and techniques but, more importantly, you'll learn how to integrate these practices into your daily life for long-term benefits.
                                                </p>
                                                <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8 '>
                                                    <h4 className='text-2xl'>This course is for beginners</h4>
                                                </div>
                                                <div>
                                                    <h4 className='text-2xl'>What you will practice?</h4>
                                                    <p className='mt-4 '>Students of my yoga course will practice various asanas, including warrior poses, and tree pose, enhancing flexibility and strength. They'll also learn pranayama breathing exercises for better mental clarity and stress relief, along with guided meditation for mindfulness and inner peace. Yoga philosophy and lifestyle principles will be incorporated to promote holistic well-being. Through personalized guidance and modifications, students will improve their physical and mental health, creating a harmonious balance in their everyday lives.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* right side  */}
                        <div className='lg:col-span-4 col-span-12 mt-8 md:mt-0'>
                            <div className='sidebarWrapper space-y-[30px]'>
                                <div className='widget custom-text space-y-5'>
                                    <a className='h-[220px] rounded relative block' href={course?.videoLink}>
                                        <img src={course.image} alt="" className='block w-full h-full object-cover rounded' />
                                        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                                            <img src="/play.png" alt="" />
                                        </div>
                                    </a>
                                    <h3>${course.price}</h3>
                                    <button onClick={() => handleSelect(course._id)} title={role === 'admin' || role=== 'instructor' ? 'Instructor/Admin cannot select' ? course.availableSeats<1 : 'No seat available' : 'You can select this class'} disabled={role=== 'admin' || role === 'instructor' || course.availableSeats<1} className='btn btn-primary w-full text-center py-2 px-6 text-white bg-secondary rounded-md'>Enroll now</button>
                                    <ul className='list'>
                                        <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                            <div className='flex-1 space-x-3 flex items-center'>
                                                <FaUser className='inline-flex'/>
                                                <div className='text-black font-semibold'>
                                                    Instructor
                                                </div>
                                            </div>
                                            <div className='flex-none'>{course.instructorName}</div>
                                        </li>
                                        <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                            <div className='flex-1 space-x-3 flex items-center'>
                                                <MdBookOnline/>
                                                <div className='text-black font-semibold'>
                                                    Lectures
                                                </div>
                                            </div>
                                            <div className='flex-none'>23</div>
                                        </li>
                                        <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                            <div className='flex-1 space-x-3 flex items-center'>
                                                <BiTime/>
                                                <div className='text-black font-semibold'>
                                                    Duration
                                                </div>
                                            </div>
                                            <div className='flex-none'>2hr 36minutes</div>
                                        </li>
                                        <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                            <div className='flex-1 space-x-3 flex items-center'>
                                                <FaUsers/>
                                                <div className='text-black font-semibold'>
                                                    Enrolled
                                                </div>
                                            </div>
                                            <div className='flex-none'>{course?.totalEnrolled}</div>
                                        </li>
                                        <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                            <div className='flex-1 space-x-3 flex items-center'>
                                                <FaLevelUpAlt/>
                                                <div className='text-black font-semibold'>
                                                    Course Level
                                                </div>
                                            </div>
                                            <div className='flex-none'>Intermediate</div>
                                        </li>
                                        <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                            <div className='flex-1 space-x-3 flex items-center'>
                                                <FaLanguage/>
                                                <div className='text-black font-semibold'>
                                                    Language
                                                </div>
                                            </div>
                                            <div className='flex-none'>English</div>
                                        </li>

                                    </ul>
                                    <ul className='flex space-x-4 items-center pt-3'>
                                        <li className='text-black font-semibold'>Share On:</li>
                                        <li>
                                            <a href="#" className='flex h-10 w-10'>
                                                <img src="/logo.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className='flex h-10 w-10'>
                                                <img src="/logo.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className='flex h-10 w-10'>
                                                <img src="/logo.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className='flex h-10 w-10'>
                                                <img src="/logo.png" alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='widget'>
                                    <h4 className='widget-title'>Related Courses</h4>
                                    <ul className='list'>
                                        <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:mb-0 last:border-0 border-b'>
                                            <div className='flex-none'>
                                                <div className='h-20 w-20'>
                                                    <img src={bannerImg1} alt="" className='w-full h-full object-cover rounded' />
                                                </div>
                                            </div>
                                            <div className='flex-1'>
                                                <div className='flex space-x-3 mb-2'>
                                                    <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
                                                    <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
                                                    <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
                                                    <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
                                                    <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
                                                </div>
                                                <div className='mb-1 font-semibold text-black'>
                                                    Greatest Passion In ...
                                                </div>
                                                <span className='text-secondary font-semibold'>
                                                    $38.00
                                                </span>
                                            </div>
                                        </li>
                                        <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:mb-0 last:border-0 border-b'>
                                            <div className='flex-none'>
                                                <div className='h-20 w-20'>
                                                    <img src={bannerImg1} alt="" className='w-full h-full object-cover rounded' />
                                                </div>
                                            </div>
                                            <div className='flex-1'>
                                                <div className='mb-1 font-semibold text-black'>
                                                    Greatest Passion In ...
                                                </div>
                                                <span className='text-secondary font-semibold'>
                                                    $38.00
                                                </span>
                                            </div>
                                        </li>
                                        <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:mb-0 last:border-0 border-b'>
                                            <div className='flex-none'>
                                                <div className='h-20 w-20'>
                                                    <img src={bannerImg1} alt="" className='w-full h-full object-cover rounded' />
                                                </div>
                                            </div>
                                            <div className='flex-1'>
                                                <div className='mb-1 font-semibold text-black'>
                                                    Greatest Passion In ...
                                                </div>
                                                <span className='text-secondary font-semibold'>
                                                    $38.00
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleClass