import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((state)=>state.userSlice.user);
    if(!user) return <Navigate to={'/signin/up'}/>
  return (
    <div className='h-screen flex justify-center items-center text-3xl font-extrabold'>
        {user.username}
    </div>
  )
}

export default Profile
 