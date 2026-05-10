    import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const ChangePassword = ({ isOpen, onClose, user ,updatePassword}) => {

  const [form, setForm] = useState({
    newPassword: "",
    currentPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        newPassword: "",
        currentPassword: ""
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updatePassword(form)


    // call API here
setForm({
        changePassword: "",
        currentPassword: ""
      });

    onClose();
  };

  return (
    <div className="
      fixed inset-0
      bg-black/30
      backdrop-blur-sm
      flex items-center justify-center
      z-50
    ">

      <motion.div
        initial={{ scale: .8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          bg-white
          w-full max-w-md
          rounded-2xl
          p-6 relative
        "
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Change Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Current Password"
          />

          <input
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="New Password"
          />

          <button className="
            w-full bg-blue-700 text-white
            py-3 rounded-lg
          ">
            Change Password
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePassword;  
        