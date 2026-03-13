import React, { useState } from "react";
import { FaTachometerAlt, FaBook, FaChartBar } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { changeTitle } from "../../util/util";



const InstructorDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

   changeTitle("Instructor Dashboard - LearnSphere")

  return (
    <div className="flex min-h-screen bg-gray-100 mt-5">

      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6">

        <h2 className="text-2xl font-bold mb-10">
          Instructor Panel
        </h2>

        <ul className="space-y-6">

          <Link
          to={"/instructor/dashboard"}
            onClick={() => setActivePage("dashboard")}
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200"
          >
            <FaTachometerAlt />
            Dashboard
          </Link>

          <Link
            to={"/instructor/courses"}
            onClick={() => setActivePage("courses")}
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200"
          >
            <FaBook />
            Course Management
          </Link>

          <Link
            to={"/instructor/analytics"}
            onClick={() => setActivePage("analytics")}
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200"
          >
            <FaChartBar />
            Analytics
          </Link>

        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-10">
        <Outlet/>
      </div>

    </div>
  );
};

export default InstructorDashboard;