import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { CATEGORIES, LEVELS } from "../constants/user.constant";

const CourseModal = ({ isOpen, onClose, onSubmit }) => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    durationInMin: "",
    level: "",
    category: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm  flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative"
      >

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Length */}
          <input
            type="number"
            name="durationInMin"
            min="1"
            placeholder="Course Length (e.g. 120 minutes)"
            value={formData.durationInMin}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Level Select */}
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Select Level</option>
             {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          {/* Category Select */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
           { <option value="">Select Category</option>}
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Create Course
          </button>

        </form>
      </motion.div>
    </div>
  );
};

export default CourseModal;