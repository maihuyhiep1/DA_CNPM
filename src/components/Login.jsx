import React from 'react';
import styles from'./style_login.module.css';

const Login = () => {
  return (
    <div className={styles.form}>
      <form action="/submit-login" method="POST">
        <div className={styles.title}>
          <div className={styles.titleText}>Đăng nhập tài khoản</div>
          <div className={styles.closeButton}>
            <img className={styles.closeImage} src="img_login/image.png" alt="Close" />
          </div>
        </div>

        <div className={styles.logo}>
          <img src="img_login/logo.png" alt="Logo" />
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

        <div className={styles.password}>
          <input
            type="password"
            id="password"
            className={styles.passwordInput}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          <div className={styles.textInLoginButton}>Đăng nhập</div>
        </button>

        <button className={styles.googleButton}>
          <div className={styles.googlePng}></div>
          <div className={styles.textInGoogleButton}>Đăng nhập bằng Google</div>
        </button>

        <div className={styles.signInAndForgetPassword}>
          <div className={styles.textInSignIn}>Chưa có tài khoản?</div>
          <div className={styles.link}>Đăng ký</div>
          <div className={styles.forgetPassword}>
            <div className={styles.link}>Quên mật khẩu</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;