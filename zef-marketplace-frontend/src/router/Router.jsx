import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "../App"
import Homepage from "../pages/Homepage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import UnloggedUserRoute from "../components/protectedRoutes/UnloggedUserRoute"
import PrivateRoutes from './../components/protectedRoutes/PrivateRoutes';
import ProfilePage from "../pages/ProfilePage"
import AdminRoutes from './../components/protectedRoutes/AdminRoutes';
import Admin from "../pages/Admin"
import ProductDetails from "../pages/ProductDetails"


const Router =  createBrowserRouter(
      createRoutesFromElements(
      <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Homepage/>}/>
      <Route index={true} path='/:page' element={<Homepage/>}/>
      <Route  path='/products/:id' element={<ProductDetails/>}/>
        <Route path='' element={<UnloggedUserRoute/>}>
      <Route path="/login" element={<LoginPage/>} />
     <Route path="/register" element={<RegisterPage/>} />
      </Route>

      <Route path="" element={<PrivateRoutes/>}>
      <Route path="/profile" element={<ProfilePage/>} />
      </Route>

      <Route path="" element={<AdminRoutes/>}>
      <Route path="/admin"  element={<Admin/>}/>
      </Route>

      </Route>
      )
    )
  


export default Router;

