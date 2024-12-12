import React, { useState } from 'react';
import styles from './forgetPassword.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [value, setValue] = useState({ username: '' }); // Initialize with an empty username
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8386/api/forgot-password/send', value, { withCredentials: true });

      if (response.data.errCode === 0) {
        console.log(response);
        toast(`Mã OTP đã được gửi về email: ${response.data.email}`);

        // Store username and email in localStorage
        localStorage.setItem('forgotPasswordData', JSON.stringify({ username: value.username }));
        navigate('/re-password'); // Redirect to Verify page
      } else {
        console.error('Sai tên đăng nhập', response.data.message);
        toast('Tên đăng nhập sai. Vui lòng điền lại !!!');
      }
    } catch (error) {
      console.error('An error occurred during OTP verification:', error);
      toast('Đã xảy ra lỗi, vui lòng thử lại sau.'); // General error message
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>
          <div className={styles.titleText}>Xác thực tên đăng nhập để lấy lại mật khẩu</div>
        </div>

        <div className={styles.otp}>
          <input
            type="text"
            id="username"
            className={styles.otpInput}
            placeholder="Username"
            required
            value={value.username} 
            onChange={(e) => setValue({ ...value, username: e.target.value })} 
          />
        </div>

        <p className={styles.notice}>Vui lòng nhập tên đăng nhập</p>

        <button type="submit" className={styles.verifyButton}>
          <div className={styles.textInVerifyButton}>Xác thực</div>
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
