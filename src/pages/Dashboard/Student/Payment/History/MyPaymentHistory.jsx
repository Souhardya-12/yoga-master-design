// import React, { useEffect, useState } from 'react'
// import useAxiosFetch from '../../../../../hooks/useAxiosFetch'
// import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
// import useUser from '../../../../../hooks/useUser';
// import moment from "moment";

// const MyPaymentHistory = () => {
//   const axiosFetch = useAxiosFetch();
//   const axiosSecure = useAxiosSecure();
//   const {currentUser} = useUser();
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paginatedPayments, setPaginatedPayments] = useState([]);
//   const totalItem = payments.length;
//   const [page, setPage] = useState(1);
//   let totalPage = Math.ceil(totalItem / 5);
//   let itemsPerPage = 5;
//   const handleChange = (event,value) => {
//     setPage(value);
//   }
  
//   useEffect(() => {
//     const lastIndex = page * itemsPerPage;
//     const firstIndex = lastIndex - itemsPerPage;
//     const currentItems = payments.slice(firstIndex, lastIndex);
//     setPaginatedPayments(currentItems);
//   },[page,payments]);

//   useEffect(() => {
//     axiosFetch.get(`/payment-history/${currentUser?.email}`).then(res => {
//       setPayments(res.data);
//       setLoading(false);
//     }).catch(err => console.log(err))
//   },[currentUser?.email]);

//   const totalPaidAmount = payments.reduce((acc,curr) => acc + curr.amount, 0);

//   if(loading) {
//     return <div>Loading...</div>
//   }


//   return (
//     <div>
//       <div className='text-center mt-6 mb-16'>
//         <p className='text-gray-400'>Hey,{" "}<span className='text-secondary font-bold'>{currentUser.name}</span>{" "}Welcome...</p>
//         <h1 className='text-4xl font-bold'>My <span className='text-secondary'>Payment</span> History</h1>
//         <p className='text-gray-500 text-sm my-3'>You can see your payment history here {" "}</p>
//       </div>

//       {/* table here */}

//       <div>
//         <div>
//           <p className='font-bold'>Total Payments: {payments.length}</p>
//           <p className='font-bold'>Total Paid: {totalPaidAmount}</p>
//         </div>

//         <div className='bg-white rounded-lg shadow-md p-6 mb-4 '>
//             <table className='w-full'>
//                 <thead>
//                     <tr>
//                         <th className='text-left font-semibold '>#</th>
//                         <th className='text-left font-semibold '>Amount</th>
//                         <th className='text-left font-semibold '>Total Items</th>
//                         <th className='text-left font-semibold '>Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         payments.length === 0 ? (<tr><td colSpan='4' className='text-center text-2xl font-bold'>No payments found</td></tr>) : (paginatedPayments.map((payment,idx) => {
//                             return (<tr key={payment._id}>
//                                 <td className='py-4'>{idx+1}</td>
//                                 <td className='py-4'>{payment.amount}</td>
//                                 <td className='py-4'>{payment.classesId.length}</td>
//                                 <td className='py-4'>
//                                   <p className='text-green-700 text-sm'>
//                                     {moment(payment.date).format("h:mm a MMMM Do YYYY")}
//                                   </p>
//                                 </td>
//                             </tr>
//                         )})
//                     )}
//                 </tbody>
//             </table>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default MyPaymentHistory





import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useUser from '../../../../../hooks/useUser';
import moment from "moment";
import { Pagination } from '@mui/material'; // If you are using Material UI

const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const {currentUser} = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  
  const handleChange = (event, value) => {
    setPage(value); // Update page number when a new page is selected
  };
  
  // Handle slicing the payments based on the current page
  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    setPaginatedPayments(payments.slice(firstIndex, lastIndex));
  }, [page, payments]);

  // Fetch payments from API
  useEffect(() => {
    axiosFetch.get(`/payment-history/${currentUser?.email}`)
      .then(res => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [currentUser?.email, axiosFetch]);

  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='text-center mt-6 mb-16'>
        <p className='text-gray-400'>
          Hey, <span className='text-secondary font-bold'>{currentUser.name}</span> Welcome...
        </p>
        <h1 className='text-4xl font-bold'>
          My <span className='text-secondary'>Payment</span> History
        </h1>
        <p className='text-gray-500 text-sm my-3'>
          You can see your payment history here
        </p>
      </div>

      <div>
        <div>
          <p className='font-bold'>Total Payments: {payments.length}</p>
          <p className='font-bold'>Total Paid: {totalPaidAmount}</p>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='text-left font-semibold'>#</th>
                <th className='text-left font-semibold'>Amount</th>
                <th className='text-left font-semibold'>Total Items</th>
                <th className='text-left font-semibold'>Time</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.length === 0 ? (
                <tr>
                  <td colSpan='4' className='text-center text-2xl font-bold'>
                    No payments found
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((payment, idx) => (
                  <tr key={payment._id}>
                    <td className='py-4'>{(page - 1) * itemsPerPage + idx + 1}</td>
                    <td className='py-4'>{payment.amount}</td>
                    <td className='py-4'>{payment.classesId.length}</td>
                    <td className='py-4'>
                      <p className='text-green-700 text-sm'>
                        {moment(payment.date).format("h:mm a MMMM Do YYYY")}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className='flex justify-center mt-4'>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPaymentHistory;
