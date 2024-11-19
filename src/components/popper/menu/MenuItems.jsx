import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./menu.module.css"

const MenuItems = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (data.title === "Trang cá nhân") {
      navigate("/profile");
    }
    if (data.title === "Đăng xuất") {
      alert('Đăng xuất')
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
