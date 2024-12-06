import React, { useState, useEffect, useContext  } from 'react';
import axios from 'axios';
import styles from './style_notice.module.css'; // Import the CSS module
import { AuthContext } from "../../context/authContext";

const Notice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.matches(`.${styles.dropbtn}`)) {
      setIsOpen(false);
    }
  };

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`http://localhost:8386/api/notices/${currentUser.id}`);
        if (response.data.success) {
          setNotices(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    window.addEventListener('click', closeDropdown);
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div>
      <div className={styles.dropdown}>
        <img
          src="img_navbar/notice.png"
          onClick={toggleDropdown}
          className={styles.dropbtn}
          alt="Notice Icon"
        />

        <div
          className={`${styles['dropdown-content']} ${
            isOpen ? styles.show : ''
          }`}
        >
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <a key={index} href={`/post/${notice.post_id}`}>
                {notice.content}
              </a>
            ))
          ) : (
            <p className={styles.noNotices}>Không có thông báo nào</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;
