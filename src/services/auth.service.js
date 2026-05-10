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

const verifyOtp = async (otp) => {  
  try {
    const response = await API.post('/auth/otp/verify', {"otp": otp });
    const data=await response.data;
    return data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}   

const changePassword = async (password) => {
  try {
    const response = await API.post('/auth/change-password', password);
    const data=await response.data;
    return  data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const forgotPassword = async (email) => {
  try {
    const response = await API.post('/auth/forgot-password', { email });
    const data=await response.data;
    return  data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
} 

const verifyOtpForgotPassword = async (forgotPassword) => {
  try {
    const response = await API.post('/auth/forgot-password/verify', forgotPassword);
    const data=await response.data;
    return  data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
} 

const loginWithGoogle = async (user) => {
  try {
    const response = await API.post('/auth/login/google', user);
    const data=await response.data;
    return  data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const signupWithGoogle = async(user)=>{
    try{
            const response= await API.post('/auth/signup/google',user);
             const data=await response.data;
             return data;
    }catch(error){
         throw error.response ? error.response.data : new Error('Network error');
    }
}




const  authservice = {
  login,
  signup,
  verifyOtp,  
  changePassword,
  forgotPassword,
  verifyOtpForgotPassword,
  loginWithGoogle,
  signupWithGoogle

};
export default authservice;
