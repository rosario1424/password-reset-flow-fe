import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/is-auth");

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/data");

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAuthState();
    }
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};




/*import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    //axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getAuthState = async ()=> {
        try {
          const {data} = await axios.get(backendUrl + '/api/v1/auth/is-auth')
          if(data.success){
            setIsLoggedin(true)
            getUserData()
          }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async ()=> {
        try {
             const {data} = await axios.get(backendUrl + '/api/v1/user/data')
            //const {data} = await axios.get(backendUrl + '/api/v1/auth/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
             toast.error(error.message)
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }

     return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
     )

}*/