import React from 'react';
import styles from './style_navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.logoBrand}>
        <img className={styles.logo} src="img_navbar/logo.png" alt="Tinhte Logo" />
        <div className={styles.brand}>Tinhte</div>
        <div className={styles.brandTitle}>MẠNG XÃ HỘI</div>
      </div>

      <div className={styles.searchBox}>
        <div className={styles.shape}>
          <div className={styles.input}>
            <input
              type="search"
              className={styles.text}
              placeholder="Tìm sản phẩm công nghệ, cộng đồng, bạn bè..."
              aria-label="Search"
            />
          </div>
        </div>
      </div>

      <div className={styles.function}>
        <div className={styles.postButton}>
          <div className={styles.textInPostButton}>Viết Bài Chia Sẻ</div>
        </div>
        <img className={styles.notice} src="img_navbar/notice.png" alt="Notifications" />
        <div className={styles.avtButton}>
          <img className={styles.dropDown} src="img_navbar/dropdown.png" alt="Dropdown" />
          <img className={styles.avtPng} src="img_navbar/avt.png" alt="Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;  