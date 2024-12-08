import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './style_setup.css';

const SetupInformation = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const location = useLocation();
  const { state } = location;

  const [nickname, setNickname] = useState(state?.nickname || '');
  const [description, setDescription] = useState(state?.description || '');
  const [avatar, setAvatar] = useState(state?.avatar || '');

  useEffect(() => {
    console.log('Nickname:', nickname);
    console.log('Description:', description);
    console.log('Avatar:', avatar);
  }, [nickname, description, avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', nickname);
      formData.append('description', description);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const response = await axios.put('http://localhost:8386/api/update-info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      const data = response.data.data;
      console.log(response)

      // Cập nhật state local
      const updatedUser = {
        ...currentUser,
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.avatar && { avatar: data.avatar }),  // Backend trả URL avatar
      };

      console.log(updatedUser);

      setCurrentUser(updatedUser);  // Cập nhật user trong context
      localStorage.setItem('user', JSON.stringify(updatedUser));  // Cập nhật localStorage

      alert('Thông tin đã được cập nhật thành công!');
    } catch (error) {
      console.error('Error updating information:', error);
      alert('Đã xảy ra lỗi khi cập nhật thông tin!');
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <textarea
          placeholder="Mô tả về bạn..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default SetupInformation;
