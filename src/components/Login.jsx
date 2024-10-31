import React from 'react';
import './style_login.css';

const Login = () => {
  return (
    <div className="form">
      <form action="/submit-login" method="POST">
        <div className="title">
          <div className="title_text">Đăng nhập tài khoản</div>
          <div className="close_button">
            <img className="close_image" src="img_login/image.png" alt="Close" />
          </div>
        </div>

        <div className="logo">
          <img src="img_login/logo.png" alt="Logo" />
        </div>

        <div className="username">
          <input
            type="text"
            id="username"
            className="username_input"
            placeholder="Username"
            required
          />
        </div>

        <div className="password">
          <input
            type="password"
            id="password"
            className="password_input"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <button type="submit" className="login_button">
          <div className="text_in_login_button">Đăng nhập</div>
        </button>

        <button className="google_button">
          <div className="google_png"></div>
          <div className="text_in_google_button">Đăng nhập bằng Google</div>
        </button>

        <div className="sign_in_and_forget_password">
          <div className="text_in_sign_in">Chưa có tài khoản?</div>
          <div className="link">Đăng ký</div>
          <div className="forget_password">
            <div className="link">Quên mật khẩu</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;