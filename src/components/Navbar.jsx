import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style_navbar.module.css";
import { AuthContext } from "../context/authContext";
import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "./popper/PopperWrapper";
import Menu from "./popper/menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const MENU_ITEM = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "Trang cá nhân",
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: "Cài đặt",
  },
  {
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    title: "Đăng xuất",
  },
];

const handleFocus = () => {
  setIsFocused(true);
};

const handleBlur = () => {
  // Delay hiding the tooltip slightly to avoid conflicts with Tippy interactions
  setTimeout(() => setIsFocused(false), 100);
};

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);
  const [searchResult, setSearchResult] = useState([]);
  const [isFocused, setIsFocused] = useState(false); // State to manage focus

  return (
    <header className={styles.navbar}>
      <div
        className={styles.logoBrand}
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          className={styles.logo}
          src="img_navbar/logo.png"
          alt="Tinhte Logo"
        />
        <div className={styles.brand}>Tinhte</div>
        <div className={styles.brandTitle}>MẠNG XÃ HỘI</div>
      </div>

      <div className={styles.searchBox}>
        <Tippy
          interactive
          visible={isFocused}
          render={(attrs) => (
            <div className={styles.searchResult} tabIndex="-1" {...attrs}>
              <PopperWrapper>Kết quả</PopperWrapper>
            </div>
          )}
        >
          <div className={styles.shape}>
            <div className={styles.input}>
              <input
                type="search"
                className={styles.text}
                placeholder="Tìm sản phẩm công nghệ, cộng đồng, bạn bè..."
                aria-label="Search"
                onFocus={handleFocus} // Show Tippy on focus
                onBlur={handleBlur} // Hide Tippy on blur
              />
            </div>
          </div>
        </Tippy>
      </div>

      <div className={styles.function}>
        <div
          className={styles.postButton}
          onClick={() => {
            navigate("/create-post");
          }}
        >
          <div className={styles.textInPostButton}>Viết Bài Chia Sẻ</div>
        </div>
        <Menu>
          <img
            className={styles.notice}
            src="img_navbar/notice.png"
            alt="Notifications"
          />
        </Menu>
        <Menu items={MENU_ITEM}>
          <div className={styles.avtButton}>
            <img
              className={styles.dropDown}
              src="img_navbar/dropdown.png"
              alt="Dropdown"
            />
            <img
              className={styles.avtPng}
              src="img_navbar/avt.png"
              alt="Avatar"
            />
            <div className={styles.username}>
              {currentUser ? currentUser.name || "Khách" : "Khách"}
            </div>
          </div>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
