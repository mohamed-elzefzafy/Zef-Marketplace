import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  const {userInfo} = useSelector(state => state.auth);
  
  return userInfo && userInfo.role === 'admin' ? <Outlet/> :
   userInfo && userInfo.role === 'user' ? <Navigate to="/"/> :  <Navigate to="/login"/> 
}

export default AdminRoutes;