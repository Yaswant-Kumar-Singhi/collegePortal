import React,{useEffect} from 'react'
import {Switch,Route} from 'react-router-dom';

//import

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import DefaultFooter from './components/nav/Footer'
import Header from '../src/components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

import UserRoutes from './components/routes/UserRoutes'
import AvailableAssignments from './pages/user/History'
import OnlineTeachers from './pages/user/OnlineTeachers'
import UpcmgAssignments from './pages/user/Upcoming'
import UserDashboard from './pages/user/UserDashboard'
import Password from './pages/user/Password'



import AdminRoutes from './components/routes/AdminRoutes'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPassword from './pages/admin/AdminPasswordUpdate'
import AdminName from './pages/admin/details/UpdateAdminName'


import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import {currentUser} from "./functions/auth"


const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        
        currentUser(idTokenResult.token).then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name : res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role : res.data.role,
              _id : res.data._id
            }
          })
          
        }).catch()
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />

        <UserRoutes exact path="/user/dashboard" component={UserDashboard} />
        <UserRoutes exact path="/user/history" component={AvailableAssignments} />
        <UserRoutes exact path="/user/upcoming" component={UpcmgAssignments} />
        <UserRoutes exact path="/user/onlineteacher" component={OnlineTeachers} />
        <UserRoutes exact path="/user/password" component={Password} />
        
        
        <AdminRoutes exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoutes exact path="/admin/password" component={AdminPassword} />
        <AdminRoutes exact path="/admin/updatename" component={AdminName} />
      </Switch>
      <DefaultFooter />
      

    </>
  );
};

export default App;
