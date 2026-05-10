import React, { use, useEffect, useState } from "react";
import { FaStar, FaPlayCircle, FaUser, FaChevronDown, FaLock } from "react-icons/fa";
import { getCourseById } from "../services/courses.service";
import { useParams } from "react-router-dom";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const CourseDetails = () => {
//   const course = {
//     title: "React Complete Course",
//     description:
//       "Master React from basics to advanced. Build real-world projects and become job ready.",
//     price: 499,
//     rating: 4.5,
//     students: 320,
//     instructor: "Ganesh Turate",
//     thumbnail: "https://source.unsplash.com/1200x600/?coding",
//     tutorials: [
//       { title: "Introduction to React", duration: "10 min" },
//       { title: "Components & Props", duration: "20 min" },
//       { title: "State & Hooks", duration: "30 min" },
//       { title: "React Router", duration: "25 min" },
//     ],
//   };
const [course,setCourse]=React.useState({});
  const {id}=useParams();

   const {user}=useAuth()
  const fetchCourseDetails = async () => {
    console.log("Fetching course details for ID:", id);
      const data=await getCourseById(id);
      console.log("Course Details:", data);
        setCourse({...data,enrolled:user?.coursesId?.includes(id) || false});

  }

  const enrollCourse=async(id)=>{  
      if(!confirm("Are you sure you want to enroll in this course?")) return; 
    const data=await userService.enrollCourse(id);
          toast.success(data?.message)
  }

    const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(()=>{
   fetchCourseDetails();
  },[id])

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {course.title}
            </h1>

            <p className="text-lg text-gray-200 mb-6">
              {course.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-300" />
                {course.rating}
              </span>

              <span>{course.students} students</span>
            </div>

            <div className="flex items-center gap-2">
              <FaUser />
              <span>{course.instructor}</span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src={course.thumbnailUrl}
              alt="course"
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="md:col-span-2 relative">

          { !course.enrolled &&<div className="absolute inset-0 bg-white/30 backdrop-blur-xs w-full h-full flex flex-col gap-3 justify-center items-center">
               <FaLock size={40} color="gray"/>
               <h1 className="font-bold text-gray-400 capitalize">Enroll to unlock this course</h1>
           </div>}
          {/* Course Content */}
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            Course Content
          </h2>

          <div className="bg-white rounded-xl shadow overflow-hidden">

     {course.tutorials && course.tutorials.map((tut, index) => (
               <div key={index} className="border-b">

          {/* Header */}
          <div
            onClick={() => toggle(index)}
            className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <FaPlayCircle className="text-blue-700" />
              <span className="text-2xl font-semibold">{tut.title}</span>
            </div>

            <FaChevronDown
              className={`transition ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Content (Expandable) */}
          {openIndex === index && (
            <div className="px-6 pb-5 text-gray-600 text-sm">
              <p className="mb-2 text-lg">{tut.content}</p>

               {tut.resourceUrl.toLowerCase().includes(".mp4") ?(
                    <video
                      src={tut.resourceUrl}
                       controls
                      className="w-80 h-60 object-cover mb-3 rounded"
                    />
                  ):
                    (
                      <img
                        src={tut.resourceUrl}
                        alt={tut.title}
                        className="w-20 h-20 object-cover mb-3 rounded"
                      />
                    )}
            </div>
          )}

        </div>
            ))}

          </div>

        </div>

        {/* 🔥 RIGHT SIDE (STICKY CARD) */}
        <div className="">

          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-10">

            <img
              src={course.thumbnail}
              className="rounded-lg mb-4"
            />

            <h2 className="text-3xl font-bold text-blue-700">
              ₹{course.price}
            </h2>

           <button disabled={course.enrolled} onClick={()=>enrollCourse(course.id)}  className={`w-full ${course.enrolled ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded-md transition duration-200`}>
                        {course.enrolled?"Enrolled":"Enroll Now"}
            </button>

            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              <li>✔ Full lifetime access</li>
              <li>✔ Certificate of completion</li>
              <li>✔ Access on mobile & laptop</li>
              <li>✔ 1:1 doubt support</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CourseDetails;