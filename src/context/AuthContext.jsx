import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../axios/axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            setUser({ token })
        }
    }, []);

    const signup = async (data) => {
        try {
            const response = await axiosInstance.post("/user/signup", data);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const login = async (data) => {
        try {
            const response = await axiosInstance.post("/user/login", data);
            localStorage.setItem("token", response.data.token);
            setUser({ token: response.data.token });
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}