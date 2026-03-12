import API from '../config/axios.config';


const login = async ({email, password}) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    const data=await response.data;
    return data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const signup = async ({name, email, password, userType}) => {
  try {
    const response = await API.post('/auth/signup', { name, email, password, userType });
      const data=await response.data;
    return data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}



const  authservice = {
  login,
  signup,
};
export default authservice;
