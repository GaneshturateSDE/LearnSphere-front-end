import React from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaLock, FaTimes } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Profile = ({ isOpen }) => {
  if (!isOpen) return null;

  const {toggleProfile}=useAuth();

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-end z-50">

      {/* Sliding Panel */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full sm:w-96 h-full shadow-lg p-6 relative"
      >

        {/* Close Button */}
        <button
          onClick={toggleProfile}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center mt-6">

          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-700"
          />

          <h2 className="text-xl font-bold mt-4 text-blue-700">
            Ganesh Turate
          </h2>

          <p className="text-gray-500">Software Engineer</p>

        </div>

        {/* Profile Details */}
        <div className="mt-8 space-y-4">

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium">ganesh@email.com</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="font-medium">Admin</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium">Pune, India</p>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-10 space-y-4">

          <button className="flex items-center gap-3 w-full bg-blue-700 text-white py-3 rounded-lg justify-center hover:bg-blue-800 transition">
            <FaUserEdit />
            Change Details
          </button>

          <button className="flex items-center gap-3 w-full border border-blue-700 text-blue-700 py-3 rounded-lg justify-center hover:bg-blue-50 transition">
            <FaLock />
            Change Password
          </button>

        </div>

      </motion.div>
    </div>
  );
};

export default Profile;