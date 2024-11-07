import React from 'react';
import styles from './style_createPost.module.css';

const CreatePost = () => {
  return (
    <div className={styles.background}>
      <div className={styles.guideLink}>
        <div className={styles.guideText}>Hướng dẫn viết bài</div>
        <div className={styles.guideImage}></div>
      </div>

      <form action="/submit-post" method="POST" className={styles.postForm}>
        <textarea
          className={styles.titleTextArea}
          name="title"
          placeholder="Nhập tiêu đề bài viết..."
          rows="2"
        ></textarea>

        <div className={styles.fileUpload}>
          <input
            type="file"
            id="fileInput"
            className={styles.fileInput}
            accept="image/*"
          />
          <img
            className={styles.uploadIcon}
            src="img_createPost/addImageIcon.png"
            alt="Add"
          />
          <div className={styles.uploadText}>Thêm ảnh đại diện</div>
          <div className={styles.dragDropText}>Hoặc kéo và thả</div>
        </div>

        <textarea
          className={styles.textArea}
          name="content"
          placeholder="Nhập đoạn giới thiệu tổng quan của bài để anh em hiểu được nội dung bài viết..."
          rows="5"
        ></textarea>

        <div className={styles.wordCount}>
          <span>Bài viết 0 từ</span>
        </div>

        <button type="submit" className={styles.submitButton}>
          <span>Đăng</span>
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
