import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateRoutes from './components/protectedRoutes/PrivateRoutes';
import AdminRoutes from './components/protectedRoutes/AdminRoutes';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UnloggedUserRoute from './components/protectedRoutes/UnloggedUserRoute';


const router = createBrowserRouter(
  createRoutesFromElements(
  
  <Route path='/' element={<App/>}>
  <Route index={true} path='/' element={<Homepage/>}/>
    {/* <Route path='' element={<UnloggedUserRoute/>}> */}
  <Route path="/login" element={<LoginPage/>} />
 <Route path="/register" element={<RegisterPage/>} />
  {/* </Route> */}




 </Route>
  
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>
);

reportWebVitals();
