import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [token,settoken] = useState(localStorage.getItem("uid"))


    useEffect(() => {
        setToken(localStorage.getItem("uid"));
    }, []);

    const setToken = (prevtoken) => {

        if(prevtoken){
            settoken(prevtoken)
            return localStorage.setItem("uid",prevtoken);
        }
    }

    const islogin = !!token;


    const gettoken = () => {
        return token;
    }

    const logout = () => {
        settoken("")
        return localStorage.removeItem("uid");
    }
    
    const getuser = () => {
        return "user"
    }



    return <AuthContext.Provider value={{setToken ,token,getuser,islogin,logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const contextvalue = useContext(AuthContext)
    return contextvalue;
}

