import React from "react";
import styles from "./style_verify.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const formData = JSON.parse(localStorage.getItem("formData")) || null;
  const [value, setValue] = useState({ ...formData });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8386/api/signin-verify",
        value,
        { withCredentials: true }
      );

      if (response.data.errCode === 0) {
        console.log("OTP verified successfully");
        toast.success("Đăng ký tài khoản thành công");
        navigate("/login"); // Redirect on successful OTP verification
      } else {
        console.error("Incorrect OTP:", response.data.message);
        toast.error("Mã OTP sai. Vui lòng điền lại !!!"); // Inform user of incorrect OTP
      }
    } catch (error) {
      console.error("An error occurred during OTP verification:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau."); // General error message
    }
  };

  return (
    <div className={styles.form}>
      <form action="/submit-login" method="POST" onSubmit={handleSubmit}>
        <div className={styles.title}>
          <div className={styles.titleText}>Xác thực gmail</div>
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

        <button type="submit" className={styles.verifyButton}>
          <div className={styles.textInVerifyButton}>Xác thực</div>
        </button>
      </form>
    </div>
  );
};

export default Verify;
