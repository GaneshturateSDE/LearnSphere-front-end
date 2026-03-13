import React from "react";

const InstructorAnalytics = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Analytics
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 shadow rounded">
          Revenue Chart
        </div>

        <div className="bg-white p-6 shadow rounded">
          Student Growth Chart
        </div>

      </div>

    </div>
  );
};

export default InstructorAnalytics;