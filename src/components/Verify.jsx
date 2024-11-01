import React from 'react';
import styles from './style_verify.module.css';

const Verify = () => {
  return (
    <div className={styles.form}>
      <form action="/submit-login" method="POST">
        <div className={styles.title}>
          <div className={styles.titleText}>Xác thực gmail</div>
          <div className={styles.closeButton}>
            <img className={styles.closeImage} src="img_verify/image.png" alt="Close" />
          </div>
        </div>

        <div className={styles.otp}>
          <input
            type="text"
            id="otp"
            className={styles.otpInput}
            placeholder="OTP"
            required
          />
        </div>

        <p className={styles.notice}>Vui lòng nhập mã OTP</p>

        <button type="submit" className={styles.verifyButton}>
          <div className={styles.textInVerifyButton}>Xác thực</div>
        </button>
      </form>
    </div>
  );
};

export default Verify;
