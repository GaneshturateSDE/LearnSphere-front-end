import API from "../config/axios.config";


const getProfile = async () => {
  try {
    const response = await API.get('/users/self');
    const data=await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const userService = {
    getProfile
}

export default userService;