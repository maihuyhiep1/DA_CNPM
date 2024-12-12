import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import styles from "./style_avtAndInformation.module.css";
import PostInProfile from "../../components/postInProfile/postInProfile";

const AvtAndInformation = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(currentUser)

  const handleUpdateInfo = () => {
    // Truyền các thông tin vào state khi điều hướng
    navigate("/update-info", {
      state: {
        nickname: currentUser.name,
        description: currentUser.description,
        avatar: currentUser.avatar,
      },
    });
  };

  return (
    <div className={styles.AvtAndInformation}>
      <div className={styles.container}>
        {/* Avatar */}
        {
              currentUser.avatar ? (
                <img
                className={styles.avatar}
                  appearance="circle"
                  src={currentUser.avatar}
                  alt={currentUser.fullname}
                  size="large"
                  name={currentUser.fullname}
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
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )
            }

        {/* Tên và Vai trò */}
        <div className={styles.name}>{currentUser.name}</div>
        <div className={styles.role}>{currentUser.role}</div>

        {/* Thông tin chi tiết */}
        <div className={styles.information}>
          <p>Tham gia từ: <strong>{currentUser.createdAt}</strong></p>
          <p>Mô tả: {currentUser.description}</p>
        </div>

        {/* Số liệu thống kê */}
        <div className={styles.informationCount}>
          <div>
            <p className={styles.postLabel}>Bài đã đăng</p>
            <p className={styles.postValue}>{currentUser.post_count}</p>
          </div>
          <div>
            <p className={styles.likeLabel}>Lượt Like</p>
            <p className={styles.likeValue}>{currentUser.like_count}</p>
          </div>
          {/* <div>
            <p className={styles.followLabel}>Lượt theo dõi</p>
            <p className={styles.followValue}>{currentUser.follower_count}</p>
          </div> */}
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
