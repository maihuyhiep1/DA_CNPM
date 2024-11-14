import React from 'react';
import styles from './style_verify.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const formData = JSON.parse(localStorage.getItem('formData')); 
  const [value, setValue] = useState({...formData});
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    await axios.post('http://localhost:8386/api/signin-verify', value, {withCredentials: true})
    .then(res => {
      console.log(res)
      if (res.data.errCode === 0) {
        navigate('/login')
      }
      else {
        alert('Mã OTP sai. Vui lòng điền lại !!!')
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.form} onSubmit={handleSubmit}>
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
            onChange={(e) => setValue({...value, code: e.target.value})}
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
