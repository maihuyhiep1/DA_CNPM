import React from 'react';
import './style_navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo_brand">
        <img className="logo" src="img_navbar/logo.png" alt="Tinhte Logo" />
        <div className="brand">Tinhte</div>
        <div className="brand_title">MẠNG XÃ HỘI</div>
      </div>

      <div className="search_box">
        <div className="shape">
          <div className="input">
            <input
              type="search"
              className="text"
              placeholder="Tìm sản phẩm công nghệ, cộng đồng, bạn bè..."
              aria-label="Search"
            />
          </div>
        </div>
      </div>

      <div className="function">
        <div className="post_button">
          <div className="text_in_post_button">Viết Bài Chia Sẻ</div>
        </div>
        <img className="notice" src="img_navbar/notice.png" alt="Notifications" />
        <div className="avt_button">
          <img className="drop_down" src="img_navbar/dropdown.png" alt="Dropdown" />
          <img className="avt-png" src="img_navbar/avt.png" alt="Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;  