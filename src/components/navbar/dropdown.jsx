import React, { useState, useContext } from 'react';
import styles from './style_dropdown.module.css'; // Import the CSS module
import { AuthContext } from "../../context/authContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.matches(`.${styles.dropbtn}`)) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      console.log("LOG OUT");
      localStorage.removeItem('user');
      const response = await axios.get(
        "http://localhost:8386/logout",
        { withCredentials: true }
      );
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  React.useEffect(() => {
    window.addEventListener('click', closeDropdown);
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div>
      <div className={styles.dropdown}>
        <img
          src="img_navbar/dropdown.png"
          onClick={toggleDropdown}
          className={styles.dropbtn}
        >
        </img>

        <div
          className={`${styles['dropdown-content']} ${isOpen ? styles.show : ''
            }`}
        >
          <a href="/profile">Trang cá nhân</a>
          {/* <a href="#about">Cài đặt</a> */}
          {currentUser.role !== "user" && <a href="/admin">Quản lý</a>}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Ngăn điều hướng mặc định
              handleLogout();
            }}
          >Đăng xuất</a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
