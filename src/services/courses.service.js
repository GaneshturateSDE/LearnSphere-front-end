import API from "../config/axios.config"

const getAllCourses=async(params={})=>{
     try {
      
       const response= await API.get("/courses",{params});
       const data=await response.data;
       
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

const updateCourse=async(courseId, courseData)=>{

      try { 
        const response= await API.put(`/courses/${courseId}`, courseData);    
        const data=await response.data;
        return data;
      } catch (error) {
        throw error;
      }
}

const addTutorial=async(courseId, tutorialData)=>{

      try {
        const response= await API.post(`/courses/${courseId}/tutorials`, tutorialData);    
        const data=await response.data;
        return data;
      } catch (error) {
        throw error;
      }   
}

const getCoursesByUser=async(coursesIds)=>{

      try {
        const response= await API.get(`/courses/user`,{
          params:{coursesIds: coursesIds}
        });    
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
    getCourseById,
    updateCourse,
    addTutorial,
    getCoursesByUser
}