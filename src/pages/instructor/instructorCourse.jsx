import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { useParams } from "react-router-dom";
import { getCourseById } from "../../services/courses.service";
import TutorialModal from "../../components/TutorialModal";

const InstructorCourse = () => {
  const { register, handleSubmit, reset } = useForm();
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorials, setTutorials] = useState([]);
  const [image, setImage] = useState(null);
  const [course, setCourse] = useState(null);
  // File Upload (Image)
  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { id } = useParams();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const onSubmit = (data) => {
    console.log("Course Data:", data);
    console.log("Image:", image);
  };
  const fetchCourse = async () => {
    const data = await getCourseById(id);
    reset(data);
    
    setCourse(data);
  };

  const handleTutorials = (newTutorial) => {
    setTutorials((prevTutorials) => [...prevTutorials, newTutorial].sort((a, b) => a.orderIndex - b.orderIndex));
    setTutorialOpen(false);
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Update Course</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <label className="block text-gray-700">Course Title</label>
        <input
          {...register("title")}
          placeholder="Course Title"
          className="w-full border p-3 rounded"
        />

        {/* Description */}
        <label className="block text-gray-700">Description</label>
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-3 rounded"
        />

        {/* Price */}
        <label className="block text-gray-700">Price (₹)</label>
        <input
          type="number"
          {...register("price")}
          placeholder="Price"
          className="w-full border p-3 rounded"
        />

        {/* Length */}
        <label className="block text-gray-700">Course Length (minutes)</label>
        <input
          {...register("durationInMin")}
          placeholder="Course Length"
          className="w-full border p-3 rounded"
        />

        {/* Image Upload */}
        <label className="block text-gray-700">Course Thumbnail</label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-6 text-center cursor-pointer rounded"
        >
          <input {...getInputProps()} />
          {image ? (
            <p>{image.name}</p>
          ) : (
            <p>Drag & drop course image or click</p>
          )}
        </div>

        {/* Add Tutorial */}
        <button
          type="button"
          onClick={() => setTutorialOpen(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Tutorial
        </button>

        <div>
          <h2 className="text-xl font-bold text-blue-700 mt-8 mb-4">
            Tutorials
          </h2>
          {tutorials.length === 0 ? (
            <p className="text-gray-600">No tutorials added yet.</p>
          ) : (
            <ul className="space-y-2">
              {tutorials.map((tut, index) => (
                <li key={index} className="border p-3 rounded">
                  <h3 className="font-semibold">{tut.orderIndex}. {tut.title}</h3>
                  <p>{tut.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded"
        >
          Save Course
        </button>
      </form>

      <TutorialModal
        isOpen={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
        handleTutorials={handleTutorials}
      />
    </div>
  );
};

export default InstructorCourse;
