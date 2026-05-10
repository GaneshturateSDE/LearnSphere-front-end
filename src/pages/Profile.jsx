import React, { useEffect, useState } from "react";
import {
  FaUserEdit,
  FaLock,
  FaSignOutAlt,
  FaStar,
  FaLaptop
} from "react-icons/fa";

import { useAuth } from "../contexts/AuthContext";
import EditProfileModal from "../components/EditProfileModal";
import ImageUploadModal from "../components/ImageUploadModal";
import userSevice from '../services/user.service';
import { toast } from "react-toastify";
import ChangePassword from "../components/ChangePassword";
import authservice from '../services/auth.service';
import { useLoader } from "../contexts/LoaderContext";
import { get } from "react-hook-form";
import userService from "../services/user.service";
import { PROFILE_URL } from "../constants/user.constant";
import { getCoursesByUser } from "../services/courses.service";




const Profile = () => {

  const { logout } = useAuth();
  const {setLoader} = useLoader();
  const [editOpen, setEditOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const { user, storeUser,authLoading } = useAuth();
  const [courses, setCourses] = useState([]);
  const onLogout = () => {
    if (!confirm("Are you sure you want to logout?")) return;
         logout();
  };
  // const getProfile = async () => {
  //   try {
  //     setLoader(true);
  //     const data = await userService.getProfile();
    
  //     storeUser(data.user)
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
    

  //    }  finally{  
  //     setLoader(false);
  //     }

  // };

  const onProfileUpdate = async (updatedUser) => {
    console.log("updated user:", updatedUser);
    setLoader(true);
    const data= await userSevice.updateProfile(updatedUser);
    storeUser(data.user)
     toast.success(data.message)
     setLoader(false);
     // update user in context
    // update user in context
  }

  const onImageUpload = async (image) => {

     const formData = new FormData();
     formData.append("file", image);
    
     const data=await userSevice.updateProfileImage(formData);
         storeUser(data.user)
     console.log("uploaded image response:", await data);
    
     
  }

  const onPasswordUpdate = async (passwordData) => {
    
     const data = await authservice.changePassword(passwordData);
     toast.success( data.message);
    
  } 

  const getCourseByUser = async (ids) => {
    console.log("Fetching courses for user with IDs:", user?.coursesId);
    try {
      setLoader(true);
      const data = await getCoursesByUser(ids);
       console.log("Courses fetched for user:", data);
      setCourses(data.data);
    } catch (error) {
      console.error("Error fetching courses by user:", error);
    } finally {
      setLoader(false);
    }
  }
 
  useEffect(() => { 
    
    getCourseByUser(user.coursesId.join(","))
  }, []);




  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <p className="text-blue-500 font-bold text-3xl">{user?.userType?.toUpperCase()}</p>
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-8">

            {/* LEFT */}
            <div className="flex flex-col sm:flex-row items-center gap-6">

              {/* CLICK IMAGE -> OPEN IMAGE MODAL */}
              <button
                onClick={() => setImageModalOpen(true)}
                className="relative"
              > 
              
                <img
                  src={user?.profileUrl || PROFILE_URL}
                  alt="profile"
                  className="
                    w-28 h-28 rounded-full object-cover
                    border-4 border-blue-700
                    hover:opacity-90
                  "
                />

                <span className="
                  absolute bottom-1 right-1
                  bg-blue-700 text-white
                  text-xs px-2 py-1 rounded-full
                ">
                  Edit
                </span>

              </button>

              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-blue-700">
                  {user?.name || "Ganesh Turate"}
                </h1>

                <p className="text-gray-500 mt-2">
                  {user?.email}
                </p>

                <p className="text-gray-500">
                  {user?.location || "Not mentioned"}
                </p>
              </div>

            </div>


            {/* RIGHT ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={() => setEditOpen(true)}
                className="
                  flex h-15 items-center gap-2 `
                  bg-blue-700 text-white
                  px-5  rounded-lg cursor-pointer
                "
              >
                <FaUserEdit />
                Change Details
              </button>

              <button
                onClick={() => setPasswordModalOpen(true)}
                className="
                  flex items-center gap-2 h-15
                  border border-blue-700 text-blue-700
                  px-5 py-3 rounded-lg cursor-pointer
                "
              >
                <FaLock />
                Change Password
              </button>

              <button
                onClick={onLogout}
                className=" h-15
                  flex items-center gap-2
                  bg-red-500 text-white
                  px-5 py-3 rounded-lg
                "
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          </div>
        </div>


        {/* My Courses */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            My Courses
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                <img
                  src={course.thumbnailUrl}
                  className="w-full h-52 object-cover"
                /> 

                <div className="p-5">
                  <h3 className="font-bold mb-3">
                    {course.title}
                  </h3>

                  <div className="flex justify-between mb-4">
                    <span className="text-blue-700 font-semibold">
                      ₹{course.price}
                    </span>

                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      {course.rating}
                    </span>
                  </div>

                  <button className="w-full bg-blue-700 text-white py-3 rounded-lg">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>


      {/* MODALS */}
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        updateUser={onProfileUpdate}
      />

      <ImageUploadModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        uploadImage={onImageUpload}
      />

      <ChangePassword
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        user={user}
        updatePassword={onPasswordUpdate}
      />


    </div>
  );
};

export default Profile;