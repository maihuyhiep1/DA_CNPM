import React, { useState } from "react";
import styles from "./style_navbar.module.css"
import Dropdown from "./dropdown"
import { useContext } from "react";
import Notice from "./notice";
import { Link } from "react-router-dom"; // Import Link from React Router
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = ({ handleSearch }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [ searchContent, setSearchContent ] = useState("");

  const onSearch = (event) => {
    setSearchContent(event.target.value);
    console.log(searchContent);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchContent);
    }
  };

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img
          className={styles.logo}
          src="img_navbar/logo.png"
          alt="HayPhet Logo"
        />
      </Link>

      <div
        className={styles.container}
        onClick={() => window.location.href = "/"}
        style={{ cursor: "pointer" }} /* Để hiển thị con trỏ tay */
      >
        <div className={styles.brand}>HayPhết</div>
        <div className={styles.brandTitle}>Review Công Nghệ</div>
      </div>


      <div className={styles.search} on>
        <input type="text" className={styles.searchInput} placeholder="Tìm kiếm sản phẩm công nghệ, cộng đồng, bạn bè..." onKeyDown={handleKeyDown} onChange={onSearch}></input>
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
        <div className={styles.notice}>
          <Notice></Notice>
        </div>
        <div className={styles.avatar}>
          <Link to="/profile"> {/* Link the avatar to the "/profile" route */}
            <img
              appearance="circle"
              src={currentUser.avatar}
              alt="Scott Farquhar"
              size="large"
              name="Scott Farquhar"
              style={{ cursor: "pointer" }} // Optional: Make it clear that it's clickable
            />
          </Link>
        </div>

      </div>

      <div className={styles.dropdown}>
        <Dropdown></Dropdown>
      </div>

    </div>

  );
  ;
}
export default Navbar;
