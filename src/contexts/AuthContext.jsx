import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import { get } from "react-hook-form";

// Create context
const AuthContext = createContext(null);

// Provider
export const AuthProvider = ({ children }) => {
    const navigation = useNavigate();
  const [user, setUser] = useState();   // store user object
  const [token, setToken] = useState(localStorage.getItem("token"));
 const [isProfileOpen, setIsProfileOpen] = useState(false);
 const [authLoading, setAuthLoading] = useState(true);


  const storeUser=(user)=>{
    
    setUser(user)
  }
  useEffect(() => {
   
      getProfile();
    },[])
  
    const getProfile=async()=>{
      try {
        const data=await userService.getProfile();
        setUser(data?.user)
        setAuthLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setAuthLoading(false);
      }
    }
  const storeToken=(token)=>{
    setToken(token)
    localStorage.setItem("token", token);
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigation("/login")
  };

  return (
    <AuthContext.Provider value={{ user, token ,storeUser,storeToken, logout,authLoading}}>
      {children}  
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
