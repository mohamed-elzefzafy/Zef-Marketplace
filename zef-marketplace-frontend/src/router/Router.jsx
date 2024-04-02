import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "../App"
import Homepage from "../pages/Homepage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import UnloggedUserRoute from "../components/protectedRoutes/UnloggedUserRoute"
import PrivateRoutes from './../components/protectedRoutes/PrivateRoutes';
import ProfilePage from "../pages/ProfilePage"


const Router =  createBrowserRouter(
      createRoutesFromElements(
      <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Homepage/>}/>
        {/* <Route path='' element={<UnloggedUserRoute/>}> */}
      <Route path="/login" element={<LoginPage/>} />
     <Route path="/register" element={<RegisterPage/>} />
      {/* </Route> */}

      {/* <Route path="" element={<PrivateRoutes/>}> */}
      <Route path="/profile" element={<ProfilePage/>} />
      </Route>
    //  </Route>
      )
    )
  


export default Router;

