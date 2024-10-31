import React from 'react';
import './style_setup.css';

const SetupInformation = () => {
  return (
    <div className="form">
      <form action="/submit-login" method="POST">
        <div className="title">
          <div className="title_text">Đăng ký thông tin</div>
          <div className="close_button">
            <img className="close_image" src="img_setup_information/image.png" alt="Close" />
          </div>
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
          Đây là tên sẽ xuất hiện trong các bài viết của bạn. Bạn có thể sử dụng tên thật hoặc nick. Bạn không thể thay
          đổi tên này về sau.
        </p>

        <div className="date">
          <input
            type="date"
            id="birthdate"
            className="date-input"
            required
          />
        </div>

        <button type="submit" className="sign_in_button">
          <div className="text_in_sign_in_button">Đăng ký</div>
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

export default SetupInformation;
