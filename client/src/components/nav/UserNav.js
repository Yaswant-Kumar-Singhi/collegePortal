import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const UserNav = () =>{
  let {user} = useSelector((state) => ({ ...state }));

  return (
  <nav>
    <ul className="nav flex-column">

      <li className="nav-item">
        <Link to="/user/dashboard" className="nav-link">
          {(user.name)} Dashboard
        </Link>
      </li>


      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
          Previous Assignments
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/upcoming" className="nav-link">
          Upcoming Assignments
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/onlineteacher" className="nav-link">
          Available Teachers
        </Link>
      </li>

     

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Update Password
        </Link>
      </li>

      
    </ul>
  </nav>
);
}

export default UserNav;


/*
Dashboard
previous assignments
upcoming assignments
teachers availble
Q/A Section
CalcyMe
Live Class
Schedule
*/