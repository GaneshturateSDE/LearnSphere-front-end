import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext(null);

// Provider
export const AuthProvider = ({ children }) => {
    const navigation = useNavigate();
  const [user, setUser] = useState(null);   // store user object
  const [token, setToken] = useState(localStorage.getItem("token"));
 const [isProfileOpen, setIsProfileOpen] = useState(false);

  const storeUser=(user)=>{
    setUser(user)
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
    <AuthContext.Provider value={{ user, token ,storeUser,storeToken, logout,toggleProfile, isProfileOpen}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
