import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./menu.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

const MenuItems = ({ data }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (data.title === "Trang cá nhân") {
      navigate("/profile");
    }
    if (data.title === "Đăng xuất") {
      logout();
      navigate("/login");
    }
  };

  return (
    <button onClick={handleClick}>
      <span className="icon">{data.icon}</span> {/* Icon */}
      <span className="title">{data.title}</span> {/* Title */}
    </button>
  );
};

export default MenuItems;
