import API from "../config/axios.config"

const getAllCourses=async()=>{
     try {
       const response= await API.get("/courses");
       const data=await response.data;
       console.log("Courses fetched:", data);
       return data;
     } catch (error) {
       throw error;
     }
}

const getCourseById=async(courseId)=>{
     try {
       const response= await API.get(`/courses/${courseId}`);
       const data=await response.data;
       return data.data;
     } catch (error) {
       throw error;
     }
}

const createCourse=async(courseData)=>{
     try {
       const response= await API.post("/courses", courseData);
       const data=await response.data;
       return data;
     } catch (error) {
       throw error;
     }
}

const deleteCourse=async(courseId)=>{
     try {
       const response= await API.delete(`/courses/${courseId}`);
       const data=await response.data;
       return data;
     } catch (error) {
       throw error;
     }
}

export  {
    getAllCourses,
    createCourse,
    deleteCourse,
    getCourseById
}