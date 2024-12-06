import React, { useState } from 'react';
import './style_setup.css';
import axios from 'axios';

const SetupInformation = () => {
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Tạo FormData để gửi dạng multipart/form-data
      const formData = new FormData();
      formData.append('name', nickname);
      formData.append('description', description);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      // Gửi API
      const response = await axios.post('http://localhost:8386/api/update-info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Xử lý kết quả
      console.log('Response:', response.data);
      alert('Thông tin đã được cập nhật thành công!');
    } catch (error) {
      console.error('Error updating information:', error);
      alert('Đã xảy ra lỗi khi cập nhật thông tin!');
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="title">
          <div className="title_text">Cập nhật thông tin</div>
          <div className="close_button">
            <img className="close_image" src="img_setup_information/image.png" alt="Close" />
          </div>
        </div>

        {/* Nickname */}
        <div className="nickname">
          <input
            type="text"
            id="nickname"
            className="nickname_input"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>

        <p className="notice">
          Đây là tên sẽ xuất hiện trong các bài viết của bạn. Bạn có thể sử dụng tên thật hoặc nick. Bạn không thể thay
          đổi tên này về sau.
        </p>

        {/* Description */}
        <div className="description">
          <textarea
            id="description"
            className="description_input"
            placeholder="Mô tả về bạn..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>

        {/* Avatar Upload */}
        <div className="avatar">
          <label htmlFor="avatarInput" className="avatar_label">
            Chọn ảnh đại diện:
          </label>
          <input
            type="file"
            id="avatarInput"
            className="avatar_input"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        <button type="submit" className="sign_in_button">
          <div className="text_in_sign_in_button">Cập nhật</div>
        </button>

        <div className="privacy_and_policy">
          <div className="text_privacy_and_policy">
            Tôi đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetupInformation;
