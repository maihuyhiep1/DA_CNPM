import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    if (inputs) {
      try {
        // First API call: Login
        const res = await axios.post(
          "http://localhost:8386/api/login",
          inputs,
          {
            withCredentials: true,
          }
        );
        console.log(inputs);
        console.log(res);
        if (res.data.errCode === 0) {
          console.log("Đăng nhập thành công", res);

          // Second API call: Fetch user details
          const userRes = await axios.get(
            "http://localhost:8386/login-success",
            {
              withCredentials: true,
            }
          );
          console.log("Lấy thông tin người dùng", userRes);
          setCurrentUser(userRes.data.user);

          return true; // Login and user fetch successful
        } else {
          alert(res.data.message || "Đăng nhập thất bại.");
          return false; // Login failed
        }
      } catch (err) {
        console.log("Login error:", err);
        alert(
          err.response?.data?.message || "Mật khẩu hoặc tên tài khoản sai !!!"
        );
        return false; // Error during login process
      }
    } else {
      window.location.href = "http://localhost:8386/google/auth";
      const userRes = await axios.get("http://localhost:8386/login-success", {
        withCredentials: true,
      });
      console.log("Lấy thông tin người dùng", userRes);
      setCurrentUser(userRes.data.user);

      return true;
    }
  };

  const logout = async () => {
    try {
      // Call the logout API
      const res = await axios.get(
        "http://localhost:8386/logout",
        {},
        { withCredentials: true }
      );
      console.log("Đăng xuất thành công", res);

      // Clear user data
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.log("Logout error:", err);
      alert("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
