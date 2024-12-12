import React from "react";
import styles from "./rePassword.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RePassword = () => {
  const forgotPasswordData =
    JSON.parse(localStorage.getItem("forgotPasswordData")) || null;
  const [value, setValue] = useState({ ...forgotPasswordData });
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value)

    if (password !== password2) {
      toast("Mật khẩu không khớp. Vui lòng kiểm tra lại!");
      return;
    } else {
      let updatedValue = { ...value, password: password };
      setValue(updatedValue);
      console.log("Form submitted with value:", updatedValue);

      try {
        const response = await axios.post(
          "http://localhost:8386/api/forgot-password/verify",
          updatedValue,
          { withCredentials: true }
        );
        console.log(response)

        if (response.data.errCode === 0) {
          console.log("OTP verified successfully");
          navigate("/login"); // Redirect on successful OTP verification
        } else {
          console.error("Incorrect OTP:", response.data.message);
          toast("Mã OTP sai. Vui lòng điền lại !!!"); // Inform user of incorrect OTP
        }
      } catch (error) {
        console.error("An error occurred during OTP verification:", error);
        toast("Đã xảy ra lỗi, vui lòng thử lại sau."); // General error message
      }
    }
  };

  return (
    <div className={styles.form}>
      <form action="/submit-login" method="POST" onSubmit={handleSubmit}>
        <div className={styles.title}>
          <div className={styles.titleText}>Xác nhận mật khẩu mới</div>
        </div>

        <div className={styles.otp}>
          <input
            type="text"
            id="otp"
            className={styles.otpInput}
            placeholder="OTP"
            required
            onChange={(e) => setValue({ ...value, code: e.target.value })}
          />
        </div>

        <p className={styles.notice}>Vui lòng nhập mã OTP</p>

        <div className={styles.otp}>
          <input
            type="password"
            id="password"
            className={styles.otpInput}
            placeholder="Mật khẩu mới"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className={styles.notice}>Nhập mật khẩu mới</p>

        <div className={styles.otp}>
          <input
            type="password"
            id="password2"
            className={styles.otpInput}
            placeholder="Xác nhận mật khẩu mới"
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <p className={styles.notice}>Xác nhận mật khẩu mới</p>

        <button type="submit" className={styles.verifyButton}>
          <div className={styles.textInVerifyButton}>Xác thực</div>
        </button>
      </form>
    </div>
  );
};

export default RePassword;
