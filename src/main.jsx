import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebaseConfig from './Authentication/firebaseConfig.jsx'
import 'react-toastify/dist/ReactToastify.css';
import store from './store.jsx';
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Registration from './Pages/Registration/Registration.jsx';
import Login from './Pages/Login/Login.jsx';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword.jsx';
import Home from './Pages/Home/Home.jsx'
import ChooseProfile from './Components/ChooseProfile/ChooseProfile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/ChooseProfile",
    element: <ChooseProfile/>,
  },
  {
    path: "/Registration",
    element: <Registration/>,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
