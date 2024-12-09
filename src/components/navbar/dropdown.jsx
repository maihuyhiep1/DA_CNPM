import React, { useState, useContext } from 'react';
import styles from './style_dropdown.module.css'; // Import the CSS module
import { AuthContext } from "../../context/authContext";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.matches(`.${styles.dropbtn}`)) {
      setIsOpen(false);
    }
  };

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
          className={`${styles['dropdown-content']} ${
            isOpen ? styles.show : ''
          }`}
        >
          <a href="/profile">Trang cá nhân</a>
          {/* <a href="#about">Cài đặt</a> */}
          {currentUser.role !== "user" && <a href={currentUser.role==="admin"?"/admin":"/moderator"}>Quản lý</a>}
          <a href="/login">Đăng xuất</a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
