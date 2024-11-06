import React from 'react';
import styles from './style_setup.module.css';

const SetupInformation = () => {
  return (
    <div className={styles.form}>
      <form action="/submit-login" method="POST">
        <div className={styles.title}>
          <div className={styles.titleText}>Đăng ký thông tin</div>
          <div className={styles.closeButton}>
            <img className={styles.closeImage} src="img_setup_information/image.png" alt="Close" />
          </div>
        </div>

        <div className={styles.nickname}>
          <input
            type="text"
            id="nickname"
            className={styles.nicknameInput}
            placeholder="Nickname"
            required
          />
        </div>

        <p className={styles.notice}>
          Đây là tên sẽ xuất hiện trong các bài viết của bạn. Bạn có thể sử dụng tên thật hoặc nick. Bạn không thể thay
          đổi tên này về sau.
        </p>

        <div className={styles.date}>
          <input
            type="date"
            id="birthdate"
            className={styles.dateInput}
            required
          />
        </div>

        <button type="submit" className={styles.signInButton}>
          <div className={styles.textInSignInButton}>Đăng ký</div>
        </button>

        <div className={styles.privacyAndPolicy}>
          <div className={styles.textPrivacyAndPolicy}>
            Tôi đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetupInformation;
