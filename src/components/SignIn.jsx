import React from 'react';
import './style_signin.css';

const SignIn = () => {
  return (
    <div className="form">
      <form action="/submit-login" method="POST">
        <div className="title">
          <div className="title_text">Đăng ký tài khoản</div>
          <div className="close_button">
            <img className="close_image" src="img_signin/image.png" alt="Close" />
          </div>
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

        <div className="nickname">
          <input
            type="text"
            id="nickname"
            className="nickname_input"
            placeholder="Nickname"
            required
          />
        </div>

        <p className="notice">
          Đây là tên sẽ xuất hiện trong các bài viết của bạn. Bạn có thể sử dụng tên thật hoặc nick. Bạn không thể thay đổi tên này về sau.
        </p>

        <div className="date">
          <input
            type="date"
            id="birthdate"
            className="date-input"
            required
          />
        </div>

        <div className="email">
          <input
            type="email"
            id="email"
            className="email_input"
            placeholder="Email"
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

        <div className="check_password">
          <input
            type="password"
            id="check_password"
            className="check_password_input"
            placeholder="Nhập lại mật khẩu"
            required
          />
        </div>

        <button type="submit" className="sign_in_button">
          <div className="text_in_sign_in_button">Đăng ký</div>
        </button>

        <button className="google_button">
          <div className="google_png"></div>
          <div className="text_in_google_button">Đăng ký bằng Google</div>
        </button>

        <div className="privacy_and_policy">
          <div className="text_privacy_and_policy">
            Tôi đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
