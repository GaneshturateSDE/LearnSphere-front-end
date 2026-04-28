import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const LoaderContext = createContext(null);

// Provider
export const LoaderProvider = ({ children }) => {
    const navigation = useNavigate();

 const [loading, setLoading] = useState(false);

 

  return (
    <LoaderContext.Provider value={{ loading ,setLoading}}>
      {children}
    </LoaderContext.Provider>
  );
};


export const useLoader = () => {
  return useContext(LoaderContext  );
};
