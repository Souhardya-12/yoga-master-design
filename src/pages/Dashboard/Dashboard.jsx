import React from 'react'
import useUser from '../../hooks/useUser'
import { FadeLoader } from "react-spinners"
import DashboardNavigate from '../../routes/DashboardNavigate';

const Dashboard = () => {
  const {currentUser, isLoading} = useUser();
  const role = currentUser?.role;

  if(isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <FadeLoader color="#0044ff" height={15} width={5} />
    </div>
  }

  return (
    <div>
      <DashboardNavigate/>
    </div>
  )
}

export default Dashboard