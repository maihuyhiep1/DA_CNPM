import React, { useState } from 'react';
import styles from './style_dropdown.module.css'; // Import the CSS module
import {
  ChatBubbleOutline,
  Favorite,
  MoreVert,
  ShareOutlined,
  ThumbUpAltOutlined,
  ThumbUp,
  Reply,
} from '@mui/icons-material';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest(`.${styles.dropdown}`)) {
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
        {/* Replace img with MoreVert icon */}
        <MoreVert
          onClick={toggleDropdown}
          className={styles.dropbtn}
          style={{ cursor: 'pointer' }} // Optional styling for the icon
        />
        <div
          className={`${styles['dropdown-content']} ${
            isOpen ? styles.show : ''
          }`}
        >
          <a href="#home">Báo cáo </a>

        </div>
      </div>
    </div>
  );
};

export default Dropdown;
