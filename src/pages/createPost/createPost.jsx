import styles from "./style_createPost.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Editor from "../../components/CKEditor/CKEditor5";

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.state || {}; // Nhận giá trị từ params, mặc định là {}
  console.log(params);

  // State khởi tạo từ params
  const [image, setImage] = useState(params.avatar || null);
  const [content, setContent] = useState(params.content || "");
  const [title, setTitle] = useState(params.title || "");
  const [isQna, setIsQna] = useState(params.qna || false);
  const [isEditing, setIsEditing] = useState(params.edit || false);
  const [postId, setPostId] = useState(params.postId || false);

  const [titleWordCount, setTitleWordCount] = useState(0);
  const [contentWordCount, setContentWordCount] = useState(0);

  // Đếm từ trong tiêu đề
  const handleWordCount = (e) => {
    const text = e.target.value;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word);

    if (e.target.name === "title") {
      setTitle(text);
      setTitleWordCount(words.length);
    }

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Đếm tổng số từ
  const totalWordCount = titleWordCount + contentWordCount;

  // Thay đổi ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề.");
      return;
    }

    if (!content.trim() && !isQna) {
      alert("Vui lòng nhập nội dung bài viết.");
      return;
    }

    // Tạo FormData
    const formData = new FormData();
    formData.append("title", title);
    if (!isQna || content) formData.append("content", content);
    if (image && image instanceof File) {
      formData.append("avatar", image);
    }
    formData.append("is_qna", isQna);

    console.log("Form Data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const url = isEditing ? `http://localhost:8386/api/posts/${postId}` : "http://localhost:8386/api/posts";
      const response = await fetch(url, {
        method: isEditing ?"PUT":"POST",
        body: formData,
        credentials: "include",
      });
      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert(isEditing ?"Bài viết được cập nhật thành công":"Bài viết đã được đăng thành công!");
      if(isEditing) {
        navigate(`/post/${postId}`);
      } else {
        handleFollow(result.postId);
      }
      setTitle("");
      setContent("");
      setImage(null);
      setIsQna(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra khi đăng bài viết.");
    }
  };



  const handleFollow = async (postId) => {
    try {
        const response = await axios.post(
            `http://localhost:8386/api/posts/${postId}/follow`,
            {
            },
            { withCredentials: true }
        );
        console.log(response);
    } catch (error) {
        console.error("Lỗi khi theo dõi bài viết:", error.message);
    }
};

  // Drag & Drop ảnh
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Chỉ chấp nhận file hình ảnh!");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Đếm từ từ nội dung HTML
  const countWordsFromHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const plainText = doc.body.textContent || "";
    const words = plainText
      .trim()
      .split(/\s+/)
      .filter((word) => word);
    return words.length;
  };

  return (
    <div className={styles.background}>
      <div className={styles.guideLink}>
        <div className={styles.guideText}>Hướng dẫn viết bài</div>
      </div>

      <form className={styles.postForm}>
        <textarea
          className={styles.titleTextArea}
          name="title"
          placeholder="Nhập tiêu đề bài viết..."
          rows="2"
          onChange={handleWordCount}
          value={title}
          style={{ overflow: "hidden" }}
        ></textarea>

        <div
          className={styles.fileUpload}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("imageInput").click()}
        >
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {image ? (
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt="Preview"
              className={styles.previewImage}
            />
          ) : (
            <>
              <img
                className={styles.uploadIcon}
                src="img_createPost/addImageIcon.png"
                alt="Add"
              />
              <div className={styles.uploadText}>Thêm ảnh đại diện</div>
            </>
          )}
        </div>

        <Editor
          initData={content}
          setData={(data) => {
            setContent(data);
            setContentWordCount(countWordsFromHTML(data));
          }}
        />

        <div className={styles.wordCount}>
          <span>Bài viết {totalWordCount} từ</span>
        </div>
        <div className={styles.checkboxWrapper}>
          <input
            id="example-1"
            className={styles.substituted}
            type="checkbox"
            checked={isQna}
            onChange={() => setIsQna((prev) => !prev)}
          />
          <label htmlFor="example-1" className={styles.label}>
            QnA
          </label>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className={styles.submitButton}
        >
          {isEditing?"Cập nhật":"Đăng"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
