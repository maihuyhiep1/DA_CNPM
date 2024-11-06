import React from 'react';
import styles from './style_signin.module.css';

const SignIn = () => {
  return (
    <div className={styles.form}>
      <form action="/submit-login" method="POST">
        <div className={styles.title}>
          <div className={styles.titleText}>Đăng ký tài khoản</div>
          <div className={styles.closeButton}>
            <img className={styles.closeImage} src="img_signin/image.png" alt="Close" />
          </div>
        </div>

        <div className={styles.username}>
          <input
            type="text"
            id="username"
            className={styles.usernameInput}
            placeholder="Username"
            required
          />
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
          Đây là tên sẽ xuất hiện trong các bài viết của bạn. Bạn có thể sử dụng tên thật hoặc nick. Bạn không thể thay đổi tên này về sau.
        </p>

        <div className={styles.date}>
          <input
            type="date"
            id="birthdate"
            className={styles.dateInput}
            required
          />
        </div>

        <div className={styles.email}>
          <input
            type="email"
            id="email"
            className={styles.emailInput}
            placeholder="Email"
            required
          />
        </div>

        <div className={styles.password}>
          <input
            type="password"
            id="password"
            className={styles.passwordInput}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <div className={styles.checkPassword}>
          <input
            type="password"
            id="check_password"
            className={styles.checkPasswordInput}
            placeholder="Nhập lại mật khẩu"
            required
          />
        </div>

        <button type="submit" className={styles.signInButton}>
          <div className={styles.textInSignInButton}>Đăng ký</div>
        </button>

        <button className={styles.googleButton}>
          <div className={styles.googlePng}></div>
          <div className={styles.textInGoogleButton}>Đăng ký bằng Google</div>
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

export default SignIn;
