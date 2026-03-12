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

export  {
    getAllCourses
}