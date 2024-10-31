import React from 'react';
import './style_verify.css';

const Verify = () => {
  return (
    <div className="form">
      <form action="/submit-login" method="POST">
        <div className="title">
          <div className="title_text">Xác thực gmail</div>
          <div className="close_button">
            <img className="close_image" src="img_verify/image.png" alt="Close" />
          </div>
        </div>

        <div className="otp">
          <input
            type="text"
            id="otp"
            className="otp_input"
            placeholder="OTP"
            required
          />
        </div>

        <p className="notice">Vui lòng nhập mã OTP</p>

        <button type="submit" className="verify_button">
          <div className="text_in_verify_button">Xác thực</div>
        </button>
      </form>
    </div>
  );
};

export default Verify;
