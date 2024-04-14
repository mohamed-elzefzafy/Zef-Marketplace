import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const {userInfo} = useSelector(state => state.auth);

  return  userInfo && userInfo.role === 'user'  ? <Outlet/> : userInfo && userInfo.role === 'admin' ?
   <Navigate to="/" replace/> : <Navigate to="/login" replace/>
}
 
export default PrivateRoutes;


