import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import styles from "./style_avtAndInformation.module.css";

const AvtAndInformation = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <img className={styles.avatar} src={currentUser.avatar} alt="Avatar" />
        <div className={styles.name}>
          <p>{currentUser.name}</p>
        </div>
        <div className={styles.role}>
          <div className={styles.roleValue}>{currentUser.role}</div>
        </div>
        <div className={styles.information}>
          <div className={styles.date}>
            <div className={styles.dateLabel}>Tham gia từ:</div>
            <div className={styles.dateValue}>{currentUser.createdAt}</div>
          </div>
        </div>
        <div className={styles.informationCount}>
          <div className={styles.post}>
            <div className={styles.postLabel}>Bài đã đăng:</div>
            <div className={styles.postValue}>{currentUser.post_count}</div>
          </div>
          <div className={styles.like}>
            <div className={styles.likeLabel}>Lượt Like:</div>
            <div className={styles.likeValue}>{currentUser.like_count}</div>
          </div>
          <div className={styles.follow}>
            <div className={styles.followLabel}>Lượt theo dõi:</div>
            <div className={styles.followValue}>
              {currentUser.follower_count}
            </div>
          </div>
        </div>

        {/* Nút Cập nhật thông tin */}
        <div className={styles.updateButtonContainer}>
          <button className={styles.updateButton} onClick={handleUpdateInfo}>
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvtAndInformation;
