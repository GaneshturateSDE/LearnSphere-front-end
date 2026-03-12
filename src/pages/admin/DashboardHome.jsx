import React from "react";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 shadow rounded">
          <h2>Total Users</h2>
          <p className="text-3xl">120</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2>Total Courses</h2>
          <p className="text-3xl">15</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2>Revenue</h2>
          <p className="text-3xl">₹45,000</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2>Enrollments</h2>
          <p className="text-3xl">320</p>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;