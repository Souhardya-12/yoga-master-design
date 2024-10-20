// import React from 'react';
// import { useLoaderData } from 'react-router-dom';
// import { FaYoutube } from 'react-icons/fa';

// const CourseDetails = () => {
//   const course = useLoaderData();

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <div className="flex flex-col md:flex-row gap-10">
        
//         {/* Left Section - Course Image */}
//         <div className="md:w-1/2">
//           <img 
//             src={course.image} 
//             alt={course.name} 
//             className="w-full h-auto rounded-lg shadow-lg object-cover" 
//           />
//         </div>
        
//         {/* Right Section - Course Details */}
//         <div className="md:w-1/2">
//           <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
//           <p className="text-gray-700 text-lg mb-4">{course.description}</p>

//           {/* Instructor Details */}
//           <div className="flex items-center mb-4">
//             <div className="text-lg font-medium">
//               <span className="text-gray-500">Instructor: </span>
//               {course.instructorName}
//             </div>
//             <div className="ml-4 text-sm text-gray-500">{course.instructorEmail}</div>
//           </div>

//           {/* Course Status */}
//           <div className="mb-4">
//             <span className={`py-1 px-3 rounded-full text-sm font-medium ${course.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//               Status: {course.status}
//             </span>
//           </div>

//           {/* Available Seats and Total Enrolled */}
//           <div className="mb-4 flex space-x-6">
//             <div className="text-lg">
//               <span className="font-semibold">Available Seats: </span>{course.availableSeats}
//             </div>
//             <div className="text-lg">
//               <span className="font-semibold">Enrolled: </span>{course.totalEnrolled}
//             </div>
//           </div>

//           {/* Price */}
//           <div className="mb-4">
//             <p className="text-2xl font-semibold text-blue-600">$ {course.price}</p>
//           </div>

//           {/* Video Link */}
//           {course.videoLink && (
//             <div className="mb-6">
//               <a 
//                 href={course.videoLink} 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="inline-flex items-center text-lg font-semibold text-red-600"
//               >
//                 <FaYoutube className="mr-2" /> Watch Course Intro
//               </a>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex space-x-4">
//             <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//               Enroll Now
//             </button>
//             <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
//               Add to Wishlist
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;


import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaYoutube } from 'react-icons/fa';

const CourseDetails = () => {
  const course = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Section - Course Image */}
        <div className="md:w-1/2">
          <img 
            src={course.image} 
            alt={course.name} 
            className="w-full h-auto rounded-lg shadow-lg object-cover" 
          />
        </div>
        
        {/* Right Section - Instructor & Video Link */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-2">Taught by {course.instructorName}</h2>

          {/* Video Link */}
          {course.videoLink && (
            <a 
              href={course.videoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-lg font-semibold text-red-600 mb-6"
            >
              <FaYoutube className="mr-2" /> Watch Course Intro
            </a>
          )}
        </div>
      </div>

      {/* Course Description */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Study Material</h3>
        <p className="text-gray-700 text-lg">
          {course.description}
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
