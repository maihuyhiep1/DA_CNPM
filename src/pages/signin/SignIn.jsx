import React from "react";
import styles from "./style_signin.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState(null);
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (!value.username || !value.name || !value.email || !password || !password2) {
      return;
    }
    
    e.preventDefault();
    if (password !== password2) {
      alert("Mật khẩu không đúng. Vui lòng nhập lại mật khẩu");
    } else {
      let updatedValue = { ...value, password: password };
      setValue(updatedValue);
      console.log("Form submitted with value:", updatedValue);
      try {
        await axios
          .post("http://localhost:8386/api/signin-send", updatedValue, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            localStorage.setItem("formData", JSON.stringify(updatedValue));
            if (res.data.errCode === 1) {
              alert('Email này đã được sử dụng')
            } else if (res.data.errCode === 0) {
              navigate("/verify");
              alert(`Mã OTP đã được gửi về email ${updatedValue.email}`)
            }
          })
      } catch(err) {setErr(err)}
    }
  };

  const handleClose = (e) =>{
    navigate("/login")
  }

  return (
    <div className={styles.form}>
      <form>
        <div className={styles.title}>
          <div className={styles.titleText}>Đăng ký tài khoản</div>
          <div className={styles.closeButton} onClick={handleClose}>
            <img
              className={styles.closeImage}
              src="img_signin/image.png"
              alt="Close"
            />
          </div>
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

        <div className={styles.nickname}>
          <input
            type="text"
            id="nickname"
            className={styles.nicknameInput}
            placeholder="Nickname"
            required
            onChange={(e) => setValue({ ...value, name: e.target.value })}
          />
        </div>

        <p className={styles.notice}>
          Đây là tên sẽ xuất hiện trong các bài viết của bạn. Bạn có thể sử dụng
          tên thật hoặc nick. Bạn không thể thay đổi tên này về sau.
        </p>

        <div className={styles.date}>
          <input
            type="date"
            id="birthdate"
            className={styles.dateInput}
            required
            // onChange={(e) => setValue({...value, birthdate: e.target.value})}
          />
        </div>

        <div className={styles.email}>
          <input
            type="email"
            id="email"
            className={styles.emailInput}
            placeholder="Email"
            required
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
        </div>

        <div className={styles.password}>
          <input
            type="password"
            id="password"
            className={styles.passwordInput}
            placeholder="Nhập mật khẩu"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className={styles.checkPassword}>
          <input
            type="password"
            id="check_password"
            className={styles.checkPasswordInput}
            placeholder="Nhập lại mật khẩu"
            required
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </div>

        <button className={styles.signInButton} onClick={handleSubmit}>
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
