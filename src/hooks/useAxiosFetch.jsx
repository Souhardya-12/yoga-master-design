import { useEffect } from "react";
import axios from "axios";

const useAxiosFetch = () => {

    const axiosInstance = axios.create({
        baseURL: 'https://yoga-master-server-new.onrender.com',
    });

    //Interceptors
    useEffect(() => {
        //request interceptor
        const requestInterceptor = axios.interceptors.request.use(function (config) {
            //do something before request is sent
            return config;
        }, function (error) {
            //do something with request error
            return Promise.reject(error);
        });

        //response interceptor
        const responseInterceptor = axios.interceptors.response.use(function (response) {
            //do something with response data
            return response;
        }, function (error) {
            //do something with response error
            return Promise.reject(error);
        });

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }
    },[axiosInstance]);

  return axiosInstance;
}

export default useAxiosFetch