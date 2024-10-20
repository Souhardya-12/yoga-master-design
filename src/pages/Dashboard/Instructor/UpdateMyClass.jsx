// import React, { useState } from 'react';
// import { useLoaderData } from 'react-router-dom';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const KEY = import.meta.env.VITE_IMG_TOKEN;

// const UpdateMyClass = () => {
//   const classDetails = useLoaderData();
//   const [image, setImage] = useState(null); // To handle image changes
//   const [updatedClass, setUpdatedClass] = useState(classDetails); // State to store updated class details
//   const axiosSecure = useAxiosSecure();

//   const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;

//   // Handle form submit to update the class
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     formData.append('file', image);

//     // Check if a new image is uploaded, otherwise use the existing image
//     if (image) {
//       fetch(API_URL, {
//         method: 'POST',
//         body: formData,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             const updatedData = {
//               ...updatedClass,
//               image: data.data.display_url,
//             };
//             updateClassInServer(updatedData);
//           }
//         });
//     } else {
//       updateClassInServer(updatedClass);
//     }
//   };

//   // Update class data in the server
//   const updateClassInServer = (updatedData) => {
//     axiosSecure.put(`/update-class/${classDetails._id}`, updatedData)
//       .then((res) => {
//         alert('Class updated successfully');
//         console.log(res.data);
//       });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedClass({ ...updatedClass, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   return (
//     <div>
//       <h1 className="text-center text-3xl font-bold">Update Your Class</h1>
//       <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow">
//         <div className="grid grid-cols-2 w-full gap-3 items-center">
//           <div className="mb-6">
//             <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
//               Course name
//             </label>
//             <input
//               type="text"
//               required
//               name="name"
//               value={updatedClass.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
//               Course thumbnail
//             </label>
//             <input
//               type="file"
//               name="image"
//               onChange={handleImageChange}
//               className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 w-full gap-3 items-center">
//           <div className="mb-6">
//             <label htmlFor="availableSeats" className="block text-gray-700 font-bold mb-2">
//               Available seats
//             </label>
//             <input
//               type="number"
//               required
//               name="availableSeats"
//               value={updatedClass.availableSeats}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
//               Price
//             </label>
//             <input
//               type="number"
//               required
//               name="price"
//               value={updatedClass.price}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
//             />
//           </div>
//         </div>
//         <div className="mb-6">
//           <label htmlFor="videoLink" className="block text-gray-700 font-bold mb-2">
//             Youtube video or playlist link
//           </label>
//           <input
//             type="text"
//             required
//             name="videoLink"
//             value={updatedClass.videoLink}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
//             Detailed Course Material
//           </label>
//           <textarea
//             name="description"
//             value={updatedClass.description}
//             onChange={handleInputChange}
//             className="resize-none border border-secondary w-full p-2 rounded-lg outline-none"
//             rows="4"
//           />
//         </div>
//         <div className="text-center w-full">
//           <button className="bg-secondary w-full hover:bg-green-500 duration-200 text-white font-bold py-2 px-4 rounded" type="submit">
//             Update Class
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateMyClass;

import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const KEY = import.meta.env.VITE_IMG_TOKEN;

const UpdateMyClass = () => {
  const classDetails = useLoaderData(); // Load class details from the loader
  const [updatedClass, setUpdatedClass] = useState(classDetails); // State to store updated class details
  const [image, setImage] = useState(null); // To handle new image upload
  const axiosSecure = useAxiosSecure();

  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}`;

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // If a new image is uploaded
    if (image) {
      const formData = new FormData();
      formData.append('image', image); // Append the image file to FormData

      try {
        // Upload new image to imgbb
        const response = await fetch(API_URL, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          // Update class details with new image URL
          const updatedData = {
            ...updatedClass,
            image: data.data.display_url, // New image URL from imgbb
          };
          await updateClassInServer(updatedData);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      // No new image uploaded, update class with existing data
      await updateClassInServer(updatedClass);
    }
  };

  // Function to update class data in the server
  const updateClassInServer = async (updatedData) => {
    try {
      const res = await axiosSecure.put(`/update-class/${classDetails._id}`, updatedData);
      alert('Class updated successfully');
      console.log(res.data);
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClass({ ...updatedClass, [name]: value });
  };

  // Handle new image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-10"><span className='text-secondary'>Update</span> Your Class</h1>
      <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow">
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Course name
            </label>
            <input
              type="text"
              required
              name="name"
              value={updatedClass.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Course thumbnail
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label htmlFor="availableSeats" className="block text-gray-700 font-bold mb-2">
              Available seats
            </label>
            <input
              type="number"
              required
              name="availableSeats"
              value={updatedClass.availableSeats}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              required
              name="price"
              value={updatedClass.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="videoLink" className="block text-gray-700 font-bold mb-2">
            Youtube video or playlist link
          </label>
          <input
            type="text"
            required
            name="videoLink"
            value={updatedClass.videoLink}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Detailed Course Material
          </label>
          <textarea
            name="description"
            value={updatedClass.description}
            onChange={handleInputChange}
            className="resize-none border border-secondary w-full p-2 rounded-lg outline-none"
            rows="4"
          />
        </div>
        <div className="text-center w-full">
          <button className="bg-secondary w-full hover:bg-green-500 duration-200 text-white font-bold py-2 px-4 rounded" type="submit">
            Update Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMyClass;

