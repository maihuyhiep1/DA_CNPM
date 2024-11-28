import React, { useState } from 'react';
import styles from './style_dropdown.module.css'; // Import the CSS module

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <a href="#home">Trang cá nhân</a>
          <a href="#about">Cài đặt</a>
          <a href="#contact">Đăng xuất</a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
