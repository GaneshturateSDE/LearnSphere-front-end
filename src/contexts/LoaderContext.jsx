import { createContext, useContext, useState } from "react";
// Create context
const LoaderContext = createContext(null);

// Provider
export const LoaderProvider = ({ children }) => {

 const [loading, setLoading] = useState(false);
 

 const setLoader = (value) => {
    console.log("Setting loader to:", value);
 
    setLoading(()=> value);
  }

 


  return (
    <LoaderContext.Provider value={{ loading ,setLoader}}>
      {children}
    </LoaderContext.Provider>
  );
};


export const useLoader = () => {
  return useContext(LoaderContext  );
};
