import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const login = async (inputs) => {
        try {
            const res = await axios.post('http://localhost:8386/api/login', inputs, { withCredentials: true });
            setCurrentUser(res.data.user);
        } catch (err) {
            console.error(err); // Log the error for debugging
            alert(err.response?.data?.message || 'Mật khẩu hoặc tên tài khoản sai !!!');
        }
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};
