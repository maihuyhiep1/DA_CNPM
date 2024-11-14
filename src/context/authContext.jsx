import axios from "axios";
import { createContext,useEffect,useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const login = async (inputs) => {
        try {
            const res = axios.post('http://localhost:8386/api/login', inputs, {withCredentials: true});
            setCurrentUser((await res).data)
        } catch {
            alert('Mật khẩu hoặc tên tài khoản sai !!!')
        }
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    );
}