    import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const EditProfileModal = ({ isOpen, onClose, user ,updateUser}) => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        location: user.location || ""
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
    updateUser(form)


    // call API here

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
          Change Details
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Name"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Email"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Location"
          />

          <button className="
            w-full bg-blue-700 text-white
            py-3 rounded-lg
          ">
            Save Changes
          </button>

        </form>

      </motion.div>

    </div>
  );
};

export default EditProfileModal;