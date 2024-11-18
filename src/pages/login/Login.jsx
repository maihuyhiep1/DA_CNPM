import React, { useContext, useState } from "react";
import styles from "./style_login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (!value.username || !value.password) return;
    e.preventDefault();
    try {
      await login(value);
      console.log(value);
      navigate("/");
    } catch (err) {
      setErr(err);
    }
  };

  const handleGGSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:8386/google/auth", {
      withCredentials: true, // Nếu backend gửi cookie
    });
    console.log("Token:", response.data.token); 
    console.log(response);
  };

  const handleForgetPassword = () => {
    navigate('/forget-password')
  }
  
  return (
    <div className={styles.form}>
      <form action="/submit-login" method="POST">
        <div className={styles.title}>
          <div className={styles.titleText}>Đăng nhập tài khoản</div>
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
            onChange={(e) => setValue({ ...value, username: e.target.value })}
          />
        </div>

        <div className={styles.password}>
          <input
            type="password"
            id="password"
            className={styles.passwordInput}
            placeholder="Nhập mật khẩu"
            required
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className={styles.loginButton}
          onClick={handleSubmit}
        >
          <div className={styles.textInLoginButton}>Đăng nhập</div>
        </button>

        <button className={styles.googleButton} onClick={handleGGSubmit}>
          <div className={styles.googlePng}></div>
          <div className={styles.textInGoogleButton}>Đăng nhập bằng Google</div>
        </button>

        <div className={styles.signInAndForgetPassword}>
          <div className={styles.textInSignIn}>Chưa có tài khoản?</div>
          <Link to="/sign-in" className={styles.link}>
            Đăng ký
          </Link>
          <div className={styles.forgetPassword} onClick={() => handleForgetPassword()}>
            <div className={styles.link}>Quên mật khẩu</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
