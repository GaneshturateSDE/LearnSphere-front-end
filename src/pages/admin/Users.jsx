import React from "react";

const Users = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        User Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Role</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">Ganesh</td>
              <td>ganesh@email.com</td>
              <td>Student</td>
            </tr>

            <tr>
              <td className="py-2">Admin</td>
              <td>admin@email.com</td>
              <td>Admin</td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Users;