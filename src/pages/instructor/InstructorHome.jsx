import React from "react";

const InstructorHome = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Instructor Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 shadow rounded">
          <h2>Total Courses</h2>
          <p className="text-3xl">5</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2>Total Students</h2>
          <p className="text-3xl">320</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2>Total Revenue</h2>
          <p className="text-3xl">₹12,000</p>
        </div>

      </div>

    </div>
  );
};

export default InstructorHome;