import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style_avtAndInformation.module.css";
import PostInProfile from "../../components/postInProfile/postInProfile";
import axios from "axios";

const AvtAndInformation = () => {
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const navigate = useNavigate();

  // Fetch thông tin người dùng khi component được mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8386/login-success", {
          withCredentials: true,
        });
        const userData = response.data.user;
        setUser(userData);
        console.log("Thông tin người dùng:", userData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        // navigate("/login"); // Điều hướng về trang đăng nhập nếu không đăng nhập
      }
    };
      fetchUserInfo();
  }, [navigate]);

  const handleUpdateInfo = () => {
    // Truyền các thông tin vào state khi điều hướng
    navigate("/update-info", {
      state: {
        nickname: user.name,
        description: user.description,
        avatar: user.avatar,
      },
    });
  };

  if (!user) {
    return <p>Đang tải thông tin...</p>;
  }

  return (
    <div className={styles.AvtAndInformation}>
      <div className={styles.container}>
        {/* Avatar */}
        {user.avatar ? (
          <img
            className={styles.avatar}
            src={user.avatar}
            alt={user.fullname}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <div
            style={{
              backgroundColor: "purple",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              color: "white",
            }}
            className={styles.avatar}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Tên và Vai trò */}
        <div className={styles.name}>{user.name}</div>
        <div className={styles.role}>{user.role}</div>

        {/* Thông tin chi tiết */}
        <div className={styles.information}>
          <p>
            Tham gia từ: <strong>{user.createdAt}</strong>
          </p>
          <p>Mô tả: {user.description}</p>
        </div>

        {/* Số liệu thống kê */}
        <div className={styles.informationCount}>
          <div>
            <p className={styles.postLabel}>Bài đã đăng</p>
            <p className={styles.postValue}>{user.post_count}</p>
          </div>
          <div>
            <p className={styles.likeLabel}>Lượt Like</p>
            <p className={styles.likeValue}>{user.like_count}</p>
          </div>
        </div>

        {/* Nút cập nhật */}
        <button className={styles.updateButton} onClick={handleUpdateInfo}>
          Cập nhật thông tin
        </button>

        {/* Bài đăng */}
        <PostInProfile />
      </div>
    </div>
  );
};

export default AvtAndInformation;
