import { createContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const validateUser = async () =>{
            const token = localStorage.getItem("token");

            if(!token){
                setLoading(false);
                return;
            }

            try {
                const { data } = await api.get("/auth/me");
                setUser(data);
            } catch(error) {
                localStorage.clear();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        validateUser();
    }, []);

    const login = async (email, password) =>{
        const { data } = await api.post("/auth/login", { 
            email,
            password,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    };

    const register = async (name, email, password) =>{
        const { data } = await api.post("/auth/register", {
            name,
            email,
            password,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    };

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ login, register, logout, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;