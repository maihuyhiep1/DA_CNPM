import React from 'react';
import styles from './style_footer.module.css'; // Import the updated CSS module

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.orderedList}>
              <div className={styles.itemLink}>
                <p className={styles.text}>TIN MỚI</p>
              </div>
              <div className={styles.sanPhamWrapper}>
                <p className={styles.text}>SẢN PHẨM CÔNG NGHỆ MỚI</p>
              </div>
              <div className={styles.khuyenMaiWrapper}>
                <p className={styles.text}>KHUYẾN MÃI</p>
              </div>
              <div className={styles.suKienWrapper}>
                <p className={styles.text}>SỰ KIỆN</p>
              </div>
              <div className={styles.videoWrapper}>
                <p className={styles.text}>VIDEO</p>
              </div>
            </div>
        </div>
        <div className={styles.link}>
        </div>
    </div>
  );
};

export default Footer;
