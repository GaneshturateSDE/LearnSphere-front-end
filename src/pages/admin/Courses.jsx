import React from "react";

const Courses = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Course Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <button className="bg-blue-700 text-white px-4 py-2 rounded mb-4">
          Add Course
        </button>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Course</th>
              <th className="text-left py-2">Instructor</th>
              <th className="text-left py-2">Price</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">React Course</td>
              <td>John</td>
              <td>₹499</td>
            </tr>

            <tr>
              <td className="py-2">Spring Boot</td>
              <td>David</td>
              <td>₹699</td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Courses;