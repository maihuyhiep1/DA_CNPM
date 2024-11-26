import React, { useRef, useEffect, useState } from 'react';
import styles from './style_commentContent_.module.css'; // Đảm bảo file CSS đúng
import avtImage from '/img_profile/avt.png';

const CommentContent = ({ placeholder = "Nhập nội dung...", onSubmit, avatarUrl }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const autoResize = () => {
    const input = inputRef.current;
    if (input) {
      input.style.height = 'auto'; // Reset chiều cao
      input.style.height = `${input.scrollHeight}px`; // Cập nhật chiều cao theo nội dung
    }
  };

  useEffect(() => {
    autoResize(); // Đảm bảo kích thước được cập nhật khi component mount
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form reload trang
    if (onSubmit) {
      onSubmit(value); // Gửi dữ liệu qua props
      setValue(''); // Reset input sau khi gửi
    }
  };

  return (
    <div className={styles.bigContainer}>
       <div onSubmit={handleSubmit} className={styles.container}>
    <img src={avtImage} alt="Avatar" className={styles.avatar} />
    <div className={styles.textAreaWrapper}>
      sadsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssskjadhjkshadjkhasjkdasdasdasdasdasdasdasashasjkhdjkashkdhaskjhdkjashdjkhaskjdhaskjdhkasjhsadsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssskjadhjkshadjkhasjkdasdasdasdasdasdasdasashasjkhdjkashkdhaskjhdkjashdjkhaskjdhaskjdhkasjhsadsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssskjadhjkshadjkhasjkdasdasdasdasdasdasdasashasjkhdjkashkdhaskjhdkjashdjkhaskjdhaskjdhkasjh
    </div>
  </div>
  <div className={styles.like}>Phản hồi</div>      
  </div>
   
    
  );
};

export default CommentContent;
