import React from "react";
import styles from "./style_newNavbar.module.css"
import Dropdown from "./dropdown"
import Notice from "./notice";
import { Link } from "react-router-dom"; // Import Link from React Router

const NewNavbar = () =>{
    return(
        <div className={styles.navbar}>
        <img
          className={styles.logo}
          src="img_navbar/logo.png"
          alt="HayPhet Logo"
        />
        <div className={styles.container}>       
            <div className={styles.brand}>HayPhết</div>
            <div className={styles.brandTitle}>Review Công Nghệ</div>
        </div>
        <div className={styles.search}>       
            <input type="text"  className={styles.searchInput}  placeholder="Tìm kiếm sản phẩm công nghệ, cộng đồng, bạn bè..."></input>
        </div>

        <div className= {styles.function}>
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
          src="./img_navbar/avt.png"
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
;}
export default NewNavbar;
