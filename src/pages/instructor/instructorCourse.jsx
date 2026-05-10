import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { useParams } from "react-router-dom";
import { addTutorial, getCourseById, updateCourse } from "../../services/courses.service";
import TutorialModal from "../../components/TutorialModal";
import { CATEGORIES, LEVELS } from "../../constants/user.constant";
import { toast } from "react-toastify";

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

  const onSubmit = async({id,...values}) => {
    console.log("course id:" + id + "Course Data:", values  );
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("durationInMin", values.durationInMin);
    formData.append("level", values.level);
    formData.append("category", values.categories);
    
    if (image) {
      formData.append("file", image);
    }


    console.log("Image:", image);
     const data=await updateCourse(id,formData);
     console.log("Course Updated:", formData);
     toast.success(data.message);
  };
  
  const fetchCourse = async () => {
    const data = await getCourseById(id);
    reset(data);
    setTutorials(data.tutorials || []);
    setCourse(data);
  };

  const handleTutorials = async(newTutorial,file) => {
    setTutorials((prevTutorials) => [...prevTutorials, newTutorial].sort((a, b) => a.orderIndex - b.orderIndex));
    const formData = new FormData();
    formData.append("title", newTutorial.title);
    formData.append("content", newTutorial.content);
    formData.append("orderIndex", tutorials.length + 1); // Set order index based on current length
    if (file) {
      formData.append("file", file);
    }
    const data=await addTutorial(id, formData);  
    console.log("Tutorial Added:", data);
    toast.success(data.message);
    setTutorialOpen(false);
    fetchCourse();
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Update Course</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
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

        {/* Categories */}
        <label className="block text-gray-700">Categories</label>
        <select
          {...register("categories")}
          placeholder="Categories"
          className="w-full border p-3 rounded"
        >
           <option value="" disabled>Select Category</option>
             {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        </select>

        {/* Price */}
        <label className="block text-gray-700">Price (₹)</label>
        <input
          type="number"
          {...register("price")}
          placeholder="Price"
          className="w-full border p-3 rounded"
        />
     
          {/* Level */}
        <label className="block text-gray-700">Level</label>
        <select
          
          {...register("level")}
          placeholder="Level"
          className="w-full border p-3 rounded"
        >
          <option value="">Select Level</option>
          {LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>


        {/* Length */}
        <label className="block text-gray-700">Course Length (minutes)</label>
        <input
          {...register("durationInMin")}
          placeholder="Course Length"
          className="w-full border p-3 rounded"
        />
         
         <div className="text-center">
          <img src={course?.thumbnailUrl} alt="Course Thumbnail" className="w-20 h-20  " />
         </div>
        {/* Image Upload */}
        <label className="block text-gray-700">Course Thumbnail</label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-6 text-center cursor-pointer rounded"
        >
          <input {...getInputProps()} name="thumbnailUrl" />
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
                <div>
                  {tut.resourceUrl?.toLowerCase().includes(".mp4") ?(
                    <video
                      src={tut.resourceUrl}
                       controls
                      className="w-full h-50 object-cover mb-3 rounded"
                    />
                  ):
                    (
                      <img
                        src={tut.resourceUrl}
                        alt={tut.title}
                        className=" object-cover mb-3 rounded"
                      />
                    )}
                <li key={index} className="border p-3 rounded">
                  <h3 className="font-semibold">{tut.orderIndex}. {tut.title}</h3>
                  <p>{tut.content}</p>
                </li>
                </div>            ))}
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
