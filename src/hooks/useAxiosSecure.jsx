// import { useContext, useEffect } from "react";
// import { AuthContext } from "../utilities/providers/AuthProvider";
// import {useNavigate} from "react-router-dom";
// import axios from "axios";


// const useAxiosSecure = () => {
//   const {logout} = useContext(AuthContext);
//   const navigate = useNavigate();
//   const axiosSecure = axios.create({
//     baseURL: 'https://yoga-master-server-new.onrender.com'
//   });
//   useEffect(() => {
//     //add a request interceptor
//       const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
//         const token = localStorage.getItem('token');
//         if(token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     })

//     //add a response interceptor
//     const responseInterceptor = axiosSecure.interceptors.response.use((response) => response, async (error) => {
//         if(error.response && (error.response.status === 401 || error.response.status === 403)) {
//             await logout();
//             navigate('/login');
//             throw error;
//         }
//         throw error;
//     })

//     return () => {
//         axiosSecure.interceptors.request.eject(requestInterceptor);     //remove the interceptors when component unmounts to
//         axiosSecure.interceptors.response.eject(responseInterceptor);   //prevent memory leaks
//     }

//   },[logout,navigate,axiosSecure]);

//   return axiosSecure;  //return the secure axios instance to be used in other components.  This instance will automatically add authentication headers when making requests.  If authentication fails, it will automatically log the user out and redirect them to the login page.  This is a secure way to make authenticated requests to the backend.  It also automatically handles errors, such as 401 Unauthorized or 403 Forbidden, by logging the user out and redirecting them to the login page.  This prevents unauthorized access to the backend.  Note: This implementation assumes that the backend API requires a Bearer token to authenticate the user.  If your backend API requires a different authentication scheme, you will need to modify this code accordingly.  Also, this implementation assumes that you have a `AuthProvider` component that provides the `logout` function to be used in the `useAxiosSecure` hook.  If your `AuthProvider` component is not available, you will need
// }

// export default useAxiosSecure


import { useContext, useEffect } from "react";
import { AuthContext } from "../utilities/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create axiosSecure instance outside the hook to avoid instance recreation on each render
const axiosSecure = axios.create({
  baseURL: 'https://yoga-master-server-new.onrender.com'  // Ensure this is the correct base URL
});

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      // Handle request errors
      return Promise.reject(error);
    });

    // Add a response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,  // Directly return the response if successful
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Handle unauthorized or forbidden errors
          await logout();
          navigate('/login');  // Redirect to login on 401/403 error
        }
        return Promise.reject(error);  // Pass error to be handled later
      }
    );

    // Cleanup interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate]);

  return axiosSecure;  // Return the configured axios instance
};

export default useAxiosSecure;
