import React, { useContext, useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import {Transition} from "@headlessui/react";
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../utilities/providers/AuthProvider';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {toast} from 'react-toastify';

const Classes = () => {
  const [classes,setClasses] = useState([]);
  const {currentUser} = useUser();
  console.log(currentUser)
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  const {user} = useContext(AuthContext);
  // console.log("current user: ",user);

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    axiosFetch.get('/classes').then(res => setClasses(res.data)).catch(err => console.log(err));
  },[]);


  //handle add to cart
  // const handleSelect = (id) => {
  //   // console.log(id)
  //   axiosSecure.get(`/enrolled-classes/${currentUser?.email}`).then(res => setEnrolledClasses(res.data)).catch(err => console.log(err))

  //   if(!currentUser){
  //     return toast.error('please login');
  //   }
  //   axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
  //   .then(res => {
  //     if(res.data.classId === id) {
  //       return toast.error("already selected")
  //     } else if (enrolledClasses.find(item => item.classes._id === id)) {
  //       return toast.error("already enrolled")
  //     } else {
  //       const data = {
  //         classId: id,
  //         userMail: currentUser.email,
  //         date: new Date()
  //       }
  //       toast.promise(axiosSecure.post('/add-to-cart', data)
  //       .then(res => {
  //         console.log(res.data);
  //       }), {
  //         pending: 'selecting...',
  //         success: {
  //           render({data}){
  //             return "selected successfully"
  //           }
  //         },
  //         error: {
  //           render({data}){
  //             return `error: ${data.message}`
  //           }
  //         }
  //       }
  //     )
  //     }
  //   })
  // }

  const handleSelect = (id) => {
    // console.log(id)
    axiosSecure.get('/enrolled-classes/${currentUser?.email}').then(res => setEnrolledClasses(res.data)).catch((err) => console.log(err))

    if(!currentUser){
      alert("please login");
      return navigate("/login");
    }

    axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
    .then(res => {
      if(res.data.classId === id) {
        return alert("already selected")
      } else if (enrolledClasses.find(item => item.classes._id === id)){
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
    <div>
      <div className='mt-20 pt-3'>
        <h1 className='text-4xl font-bold text-center text-secondary'>Classes</h1>
      </div>
      <div className='my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
        {
          classes.map((cls,index) => (
            <div
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 mx-auto ${cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={()=> handleHover(index)}
            onMouseLeave={()=> handleHover(null)}
            >
              <div className='relative h-48'>
                <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-100 ${hoveredCard===index ? "opacity-60" : ""}`} />
                <img src={cls.image} alt="" className='object-cover w-full h-full' />
                <Transition
                show={hoveredCard===index}
                enter='transition-opacity duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                >
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <button onClick={() => handleSelect(cls._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin cannot select' : cls.availableSeats<1 ? 'no seat available' : 'you can select classes'}
                    disabled={role === 'admin' || role === 'instructor' || cls.availableSeats<1}

                    className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>Add to Cart</button>
                  </div>
                </Transition>
              </div>
              {/* details */}
              <div className='px-6 py-2'>
                <h3 className='font-bold mb-1'>{cls.name}</h3>
                <p className='text-gray-500 text-xs '>Instructor: {cls.instructorName}</p>
                <div className='flex items-center justify-between mt-4'>
                  <span className='text-gray-600 text-xs'>Available Seats: {cls.availableSeats}</span>
                  <span className='text-green-500 font-semibold'>${cls.price}</span>
                </div>
                <Link to={`/class/${cls._id}`}><button className='px-4 py-2 my-4 w-full text-white mx-auto disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-300'>View</button></Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Classes