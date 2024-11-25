import React from 'react';
import styles from './style_postInProfile.module.css';

const PostInProfile = () => {
  return (
    <div className={styles.postItem}>
      <div className={styles.title}>
        <p>Dòng máy trạm di động HP ZBook sẽ bị AMdasdasdasdassadaD Strix Halo APU?</p>
      </div>
      <img className={styles.image} src="img_profile/postImage.png" alt="postImg" />      
      <div className={styles.content}>
        <div className={styles.contentValue}>
       aslkdhasjdaksh
        </div>
        <div className={styles.more}>Xem thêm</div>
      </div>
    </div>
  );
};

export default PostInProfile;
