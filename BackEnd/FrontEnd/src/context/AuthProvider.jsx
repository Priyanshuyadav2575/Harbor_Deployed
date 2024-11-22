import axios from "axios"
import { createContext, useEffect, useState,useContext } from "react"

export const AuthContext=createContext()
export const AuthProvider=({children})=> {
   
    const [blogs,setBlogs]=useState()
    const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);



    useEffect(()=>{

        const fetchProfile = async () => {
            try {
              
              let token = localStorage.getItem("jwt"); 
              console.log(token);
              if (token) {
                const { data } = await axios.get(
                  "http://localhost:4000/api/users/my-profile",
                  {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log(data);
                setProfile(data);
                setIsAuthenticated(true);
              }
            } catch (error) {
              console.log(error);
            }
          };

        const fetchBlogs=async()=>{
            try {
                const response=await axios.get("http://localhost:4000/api/blogs/all-blogs")
                console.log(response)
                setBlogs(response.data)

                
            } catch (err) {
                console.log(err);
                
                
            }
        }
        fetchBlogs()
        fetchProfile();


    },[])


    return (
       <AuthContext.Provider value={{ blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

