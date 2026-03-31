import React, { use, useEffect, useState } from "react";

import CourseModal from "../../components/CourseModal";
import { createCourse, deleteCourse, getAllCourses } from "../../services/courses.service";
import { Route, useNavigate } from "react-router-dom";
import Course from "../../components/Course";
import { toast } from "react-toastify";

const InstructorCourseManagement = () => {
   const [isOpen, setIsOpen] = useState(false);
   const[courses,setCourses]=useState([]);

   const navigation=useNavigate();

    useEffect(()=>{
        handlefetchCourses();
    },[])
   
    const handlefetchCourses=async()=>{
        const data=await getAllCourses();
        setCourses(data.data);
    }

   const handleCourseSubmit =async (courseData) => {
      console.log("New course data:", courseData);  
     const data=await createCourse(courseData);
     toast.success(data.message);
     handlefetchCourses()
   }
   
 const handleDelete=async(courseId)=>{
      
    if(!confirm("Are you sure you want to delete this course?")) return;
      const data=await deleteCourse(courseId);
      // alert(data.message);
      toast.success(data.message);
      handlefetchCourses();
  }

  const openCourseDetails=(courseId)=>{
        navigation(`/instructor/courses/${courseId}`)
  }
   

  return (
    <div>

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Course Management
      </h1>

      <button className="bg-blue-700 text-white px-4 py-2 rounded mb-4" onClick={()=>setIsOpen(true)} >
        Add New Course
      </button>

         <CourseModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleCourseSubmit} />

      <div className="bg-white p-6 shadow rounded">
        {courses.length === 0 ? (
          <p className="text-gray-600">No courses available. Please add some courses.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {courses.map((course) => (
              <Course key={course.id} value={course} handleDelete={handleDelete} handleDetails={openCourseDetails} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default InstructorCourseManagement;