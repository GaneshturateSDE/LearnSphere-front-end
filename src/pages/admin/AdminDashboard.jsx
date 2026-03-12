import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaList,
  FaCreditCard,
  FaChartBar,
  FaCog
} from "react-icons/fa";

import {  Link, Outlet } from "react-router-dom";



const AdminDashboard = () => {

 

  const renderComponent = (event) => {
       const sidebar = document.getElementById("side-bar");
       const items = sidebar.children;
       console.log(event.target.tagName);
         for(let item of items){       
            item.classList.remove("text-gray-300");
            }  
       
            if(event.target.tagName === "A")
               event.target.classList.add("text-gray-300");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6">

        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <ul className="space-y-6" id="side-bar" onClick={(e) => renderComponent(e)}>

          < Link to="/admin/" className="flex gap-3 cursor-pointer  ">
            <FaTachometerAlt /> Dashboard
          </ Link>

          < Link  to="/admin/users" className="flex gap-3 cursor-pointer  ">
            <FaUsers /> Users
          </ Link>

          < Link to="/admin/courses" className="flex gap-3 cursor-pointer  ">
            <FaBook /> Courses
          </ Link>

          < Link to="/admin/categories" className="flex gap-3 cursor-pointer  ">
            <FaList /> Categories
          </ Link>

          < Link to="/admin/payments" className="flex gap-3 cursor-pointer  ">
            <FaCreditCard /> Payments
          </ Link>

          < Link to="/admin/analytics"  className="flex gap-3 cursor-pointer  ">
            <FaChartBar /> Analytics
          </ Link>

          < Link to="/admin/settings" className="flex gap-3 cursor-pointer  ">
            <FaCog /> Settings
          </ Link>

        </ul>

      </div>

      {/* Dynamic Content */}
      <div className="flex-1 p-10">
        <Outlet/>
      </div>

    </div>
  );
};

export default AdminDashboard;