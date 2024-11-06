import React from 'react';
import styles from './style_avtAndInformation.module.css';

const AvtAndInformation = () => {
  return (
    <div className={styles.AvtAndInformation}>
      <div className={styles.container}>
        <img className={styles.avatar} src="img_profile/avt.png" alt="Avatar" />
          <div className={styles.name}>
            <p>Mai Huy Hiep</p> 
            </div>  
          <div className={styles.role}>
            <div className={styles.roleValue}>Admin</div>
          </div>
        <div className={styles.information}>
          <div className={styles.date}>
            <div className={styles.dateLabel}>Tham gia từ:</div>
            <div className={styles.dateValue}>13/12/2022</div>
          </div>
        </div>
        <div className={styles.informationCount}>
        <div className={styles.post}>
            <div className={styles.postLabel}>Bài đã đăng:</div>
            <div className={styles.postValue}>1.286</div>
          </div>
          <div className={styles.like}>
            <div className={styles.likeLabel}>Lượt Like:</div>
            <div className={styles.likeValue}>12.057</div>
          </div>
          <div className={styles.follow}>
            <div className={styles.followLabel}>Lượt theo dõi:</div>
            <div className={styles.followValue}>216</div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default AvtAndInformation;
