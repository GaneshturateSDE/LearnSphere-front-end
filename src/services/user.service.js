import API from "../config/axios.config";


const getProfile = async () => {
  try {
    const response = await API.get('/users/self');
    const data=await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
   
  }
}

const updateProfile = async (userData) => {
  try {
    const response = await API.put('/users/self', userData);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response ? error.response.data : new Error('Network error');
  }
}
const updateProfileImage = async (formData) => {
  try {
    const response = await API.patch('/users/self/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error.response ? error.response.data : new Error('Network error');
  }
} 

const enrollCourse = async (courseId) => {
  try {
    const response = await API.post(`/users/enroll/${courseId}`);
    const data = await response.data;
    return data;
  }catch (error) {  
    console.error("Error enrolling in course:", error); 
  }
}


const userService = {
    getProfile,
    updateProfile,
    updateProfileImage,
    enrollCourse
}

export default userService;